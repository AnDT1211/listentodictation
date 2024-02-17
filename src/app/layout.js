import {Inter} from "next/font/google";
import "./globals.css";
import Grid from "@mui/material/Grid";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Listen To Dictation",
  description: "Generated by Andt",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="container my-5 mx-auto">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <p className="text-center text-4xl">Listen To Dictation</p>
      </Grid>
      {children}
    </div>
    </body>
    </html>
  );
}