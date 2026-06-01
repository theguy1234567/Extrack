import Navigation from "@/components/Navigation";
import Toolbar from "@/components/Toolbar";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <div className=" min-h-screen ">
      <div className="flex ">
        <Navigation />
        <div className="w-full m-5 ">
          <Toolbar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
