import { products, contacts, type Product, type Contact, type InsertProduct, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contacts: Map<number, Contact>;
  private currentProductId: number;
  private currentContactId: number;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    this.currentProductId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private async initializeProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: "Round Bales",
        description: "Large round bales perfect for cattle feed and storage efficiency. High-quality alfalfa and timothy mix.",
        price: 4500, // $45.00
        type: "round",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
      },
      {
        name: "Square Bales",
        description: "Traditional square bales ideal for horses and small livestock. Easy to handle and store.",
        price: 1200, // $12.00
        type: "square",
        image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
      },
      {
        name: "Premium Alfalfa",
        description: "Top-grade alfalfa bales with high protein content. Perfect for dairy cattle and performance horses.",
        price: 1800, // $18.00
        type: "alfalfa",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
      },
    ];

    for (const product of sampleProducts) {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    }
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      inStock: insertProduct.inStock ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      productType: insertContact.productType ?? null,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
