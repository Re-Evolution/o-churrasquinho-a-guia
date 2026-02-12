export type MenuCategory = "carnes" | "peixes" | "sobremesas";

export interface MenuItem {
  category: MenuCategory;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: string;
  image: string | null;
}

export interface MenuData {
  items: MenuItem[];
  updatedAt: string;
}
