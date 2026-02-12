import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { MenuData, MenuItem, MenuCategory } from "@/types/menu";

const CACHE_PATH = path.join(process.cwd(), "data", "menu-cache.json");
const VALID_CATEGORIES: MenuCategory[] = ["carnes", "peixes", "sobremesas"];

async function readCache(): Promise<MenuData> {
  try {
    const raw = await readFile(CACHE_PATH, "utf-8");
    return JSON.parse(raw) as MenuData;
  } catch {
    return { items: [], updatedAt: "" };
  }
}

function isValidItem(item: unknown): item is MenuItem {
  if (typeof item !== "object" || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    typeof obj.price === "string" &&
    typeof obj.category === "string" &&
    VALID_CATEGORIES.includes(obj.category as MenuCategory)
  );
}

export async function GET() {
  const data = await readCache();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
  });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.MENU_WEBHOOK_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Invalid payload: items must be an array" },
        { status: 400 }
      );
    }

    for (const item of body.items) {
      if (!isValidItem(item)) {
        return NextResponse.json(
          { error: "Invalid menu item", item },
          { status: 400 }
        );
      }
    }

    const menuData: MenuData = {
      items: body.items.map((item: MenuItem) => ({
        category: item.category,
        name: item.name,
        nameEn: item.nameEn || undefined,
        description: item.description,
        descriptionEn: item.descriptionEn || undefined,
        price: item.price,
        image: item.image || null,
      })),
      updatedAt: new Date().toISOString(),
    };

    await mkdir(path.dirname(CACHE_PATH), { recursive: true });
    await writeFile(CACHE_PATH, JSON.stringify(menuData, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, count: menuData.items.length },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
