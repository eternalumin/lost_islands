# 🌴 Lost Islands

An interactive Next.js web application for exploring legendary and phantom islands from maritime history. Features a 3D globe, 2D maps, and a beautiful vintage aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-13.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.5-2d3748)
![MySQL](https://img.shields.io/badge/MySQL-4479A1-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## ✨ Features

- **Interactive 3D Globe** - Explore islands on a stunning 3D globe rendered with Three.js
- **2D Map View** - Traditional map view with Leaflet
- **Island Database** - MySQL database with Prisma ORM containing 20+ legendary islands
- **Vintage Aesthetic** - Beautiful ocean-inspired theme with gold accents
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode** - Eye-friendly dark theme by default

## 🛠️ Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Maps**: Leaflet, React Leaflet, Globe.gl
- **Database**: MySQL with Prisma ORM
- **UI Components**: Radix UI, Shadcn/ui
- **Fonts**: Pirata One (vintage), Inter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eternalumin/lost_islands.git
cd lost_islands

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma migrate dev

# Seed the database with sample islands
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/lost_islands"
```

## 📁 Project Structure

```
lost_islands/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── map/            # Interactive map page
│   └── ...
├── components/         # React components
│   ├── sections/       # Page sections
│   └── ui/             # UI components (shadcn)
├── prisma/             # Database schema & seeds
│   ├── schema.prisma  # Database models
│   └── seed.ts        # Sample data
├── lib/                # Utilities
└── public/             # Static assets
```

## 🎨 Design System

- **Primary Color**: Amber/Gold (#d4a857)
- **Background**: Deep Ocean (#0a0f1e)
- **Accent**: Ocean Blue (#2d4a6f)
- **Typography**: 
  - Headlines: Pirata One (vintage feel)
  - Body: Inter (clean readability)

## 📸 Screenshots

The application features:
- Hero section with animated ocean background
- 3D globe with island markers
- 2D interactive map with popups
- Vintage-styled island cards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌊 Credits

Inspired by the mysteries of the seven seas and the legends of lost civilizations.