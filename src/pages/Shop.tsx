import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "PlayIQ Starter Blocks",
    description: "Begin your AR adventure with the essential block set",
    price: 49.99,
    type: "physical",
  },
  {
    id: 2,
    name: "PlayIQ Course Access",
    description: "Full access to guided learning curriculum",
    price: 29.99,
    type: "digital",
  },
  {
    id: 3,
    name: "PlayIQ Pro Bundle",
    description: "Blocks + Course + Exclusive content",
    price: 69.99,
    type: "bundle",
  },
];

const Shop = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              <span className="text-primary text-glow-primary">Shop</span>
            </h1>
            <p className="text-muted-foreground">
              Get blocks, courses, and bundles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <Link key={product.id} to={`/shop/${product.id}`}>
                <HUDPanel className="h-full hover:scale-105 transition-transform cursor-pointer">
                  <div className="aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center border border-border/30">
                    {product.type === "physical" ? (
                      <Package className="w-16 h-16 text-tertiary" />
                    ) : (
                      <ShoppingBag className="w-16 h-16 text-primary" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <HUDButton size="sm">Add to Cart</HUDButton>
                  </div>
                </HUDPanel>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Shop;
