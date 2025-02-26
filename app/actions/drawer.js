// actions/fetchCategories.js
"use server";
import { supabase } from "../supabaseClient";
import { cache } from "react";

export const getDrawer = cache(async (customNames = {}) => {
  try {
    // Get all distinct combinations of country and type
    const { data: categories, error } = await supabase
      .from("contents")
      .select("country, type")
      .not("country", "is", null)
      .order("country")
      .order("type");

    if (error) throw error;

    // Create unique categories by combining country and type
    const uniqueCategories = Array.from(
      new Set(categories.map((c) => `${c.country}-${c.type}`))
    ).map((cat) => {
      const [country, type] = cat.split("-");

      // Generate a default display name if none is provided
      const defaultDisplayName = `${country} ${type}`.toUpperCase();

      // Check if a custom name exists for this category
      const customKey = `${country}-${type}`.toLowerCase();
      const displayName = customNames[customKey] || defaultDisplayName;

      return {
        country,
        type,
        displayName,
      };
    });

    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
});
