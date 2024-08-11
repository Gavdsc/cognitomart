import { z } from "zod";
// import { Delay } from "@/common/utilities";

/**
 * Zod schema object to ensure response is as expected.
 */
const ProductSchema = z.object({
   id: z.number(),
   name: z.string(),
   description: z.string(),
   price: z.number() 
});

const ProductsSchema = z.array(ProductSchema);

/**
 * Function to fetch and validate products.
 */
export const fetchProducts = async () => {
    try {
        const response: Response = await fetch("https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        // Throw an error if the response isn't ok
        if (!response.ok)
            throw new Error(`Error: ${response.status}`);
        
        // Retrieve the response as json
        const data = await response.json();
    
        // Note: this validates the whole product response. If finer validation is necessary, it can be looped on a per-product basis.
        const products: Product[] = ProductsSchema.parse(data);

        // Uncomment the delay here and the import at the top 
     //   await Delay(5000);

        return products;
    } catch (error) {
        console.error("Error fetching or validating:", error);
        
        // return an empty array so that the action can convert to a blank map.
        return [];    
    }
}