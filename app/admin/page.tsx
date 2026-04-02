"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Island {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export default function AdminDashboard() {
  const [islands, setIslands] = useState<Island[]>([]);
  const [form, setForm] = useState<Partial<Island>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Islands from DB
  const fetchIslands = async () => {
    try {
      const res = await fetch("/api/islands");
      if (!res.ok) throw new Error("Failed to fetch islands");
      const data = await res.json();
      setIslands(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchIslands();
  }, []);

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "latitude" || name === "longitude"
          ? parseFloat(value)
          : value,
    });
  };

  // ✅ Create / Update
  const handleSubmit = async () => {
    if (!form.name || form.latitude == null || form.longitude == null) {
      alert("Name, Latitude, and Longitude are required!");
      return;
    }

    setLoading(true);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/islands/${editId}` : "/api/islands";
      const body = JSON.stringify(form);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!res.ok) throw new Error("Submit failed");
      await fetchIslands(); // Refresh after save
      setForm({});
      setEditId(null);
      setOpen(false);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this island?")) return;

    try {
      const res = await fetch(`/api/islands/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchIslands();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🧭 Admin Dashboard</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-700 hover:bg-indigo-800">
            {editId ? "✏️ Edit Island" : "+ Add New Island"}
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#1c1c1c] border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            {editId ? "Edit Island" : "Add Island"}
          </h2>
          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Name"
              value={form.name || ""}
              onChange={handleChange}
              className="bg-gray-800 text-white border-gray-600"
            />
            <Input
              name="latitude"
              type="number"
              placeholder="Latitude"
              value={form.latitude?.toString() || ""}
              onChange={handleChange}
              className="bg-gray-800 text-white border-gray-600"
            />
            <Input
              name="longitude"
              type="number"
              placeholder="Longitude"
              value={form.longitude?.toString() || ""}
              onChange={handleChange}
              className="bg-gray-800 text-white border-gray-600"
            />
            <Input
              name="description"
              placeholder="Description"
              value={form.description || ""}
              onChange={handleChange}
              className="bg-gray-800 text-white border-gray-600"
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {editId ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        {islands.length === 0 ? (
          <p className="text-gray-400 text-center">No islands found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((island) => (
              <div
                key={island.id}
                className="bg-[#1a1a1a] border border-gray-700 p-5 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition"
              >
                <h3 className="text-xl font-bold text-indigo-400 mb-2">
                  🏝️ {island.name}
                </h3>
                <p className="text-gray-400 mb-1">
                  📍 Lat: {island.latitude}, Long: {island.longitude}
                </p>
                {island.description && (
                  <p className="text-gray-500 text-sm mb-3">{island.description}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setForm(island);
                      setEditId(island.id);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(island.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
