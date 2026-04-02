import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { wikipediaLink, islandId } = req.body;

    if (!wikipediaLink || !islandId) {
      return res.status(400).json({ message: 'Wikipedia link and island ID are required' });
    }

    try {
      const references = await extractReferencesFromWikipedia(wikipediaLink);
      await saveReferencesToDatabase(islandId, references);
      res.status(200).json({ message: 'References successfully saved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error extracting or saving references' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function extractReferencesFromWikipedia(url: string) {
  const fixedUrl = url.replace('en.m.wikipedia.org', 'en.wikipedia.org'); // ✅ mobile fix
  const { data } = await axios.get(fixedUrl);
  const $ = cheerio.load(data);

  const references: { source_name: string; source_url: string | null; description: string | null }[] = [];

  $('ol.references > li').each((i, el) => {
    const sourceName = $(el).text().trim().replace(/\[\d+\]/g, '');
    const sourceUrl = $(el).find('a[href^="http"]').attr('href');

    references.push({
      source_name: sourceName.slice(0, 255),
      source_url: sourceUrl || null,
      description: sourceName.length > 255 ? sourceName : null,
    });
  });

  return references;
}

async function saveReferencesToDatabase(islandId: number, references: { source_name: string; source_url: string | null; description: string | null }[]) {
  const db = await mysql.createConnection({
    host: 'localhost',       // ✅ no http           // ✅ if you're using a custom port
    user: 'root',
    password: 'fuckyadope',
    database: 'lost_islands',
  });

  for (const ref of references) {
    await db.execute(
      'INSERT INTO `references` (island_id, source_name, source_url, description) VALUES (?, ?, ?, ?)',
      [islandId, ref.source_name, ref.source_url, ref.description]
    );
  }

  db.end();
}
