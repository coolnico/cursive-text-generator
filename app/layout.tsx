import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Dancing_Script,
  Great_Vibes,
  Pacifico,
  Style_Script,
  WindSong,
  Satisfy,
  Sacramento,
  Parisienne,
  Damion,
  Yellowtail,
  Cedarville_Cursive,
  Homemade_Apple,
  Allura,
  Calligraffitti,
  Dawning_of_a_New_Day,
  Beth_Ellen,
  Lovers_Quarrel,
  Ruthie,
  Zeyada,
  Lobster,
  Fuggles,
  Caveat,
  Pinyon_Script,
  Mr_Dafoe,
  Reenie_Beanie
} from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-great-vibes' });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });
const styleScript = Style_Script({ weight: '400', subsets: ['latin'], variable: '--font-style-script' });
const windSong = WindSong({ weight: '400', subsets: ['latin'], variable: '--font-windsong' });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'], variable: '--font-satisfy' });
const sacramento = Sacramento({ weight: '400', subsets: ['latin'], variable: '--font-sacramento' });
const parisienne = Parisienne({ weight: '400', subsets: ['latin'], variable: '--font-parisienne' });
const damion = Damion({ weight: '400', subsets: ['latin'], variable: '--font-damion' });
const yellowtail = Yellowtail({ weight: '400', subsets: ['latin'], variable: '--font-yellowtail' });
const cedarvilleCursive = Cedarville_Cursive({ weight: '400', subsets: ['latin'], variable: '--font-cedarville-cursive' });
const homemadeApple = Homemade_Apple({ weight: '400', subsets: ['latin'], variable: '--font-homemade-apple' });
const allura = Allura({ weight: '400', subsets: ['latin'], variable: '--font-allura' });
const calligraffitti = Calligraffitti({ weight: '400', subsets: ['latin'], variable: '--font-calligraffitti' });
const dawningOfANewDay = Dawning_of_a_New_Day({ weight: '400', subsets: ['latin'], variable: '--font-dawning-of-a-new-day' });
const bethEllen = Beth_Ellen({ weight: '400', subsets: ['latin'], variable: '--font-beth-ellen' });
const loversQuarrel = Lovers_Quarrel({ weight: '400', subsets: ['latin'], variable: '--font-lovers-quarrel' });
const ruthie = Ruthie({ weight: '400', subsets: ['latin'], variable: '--font-ruthie' });
const zeyada = Zeyada({ weight: '400', subsets: ['latin'], variable: '--font-zeyada' });
const lobster = Lobster({ weight: '400', subsets: ['latin'], variable: '--font-lobster' });
const fuggles = Fuggles({ weight: '400', subsets: ['latin'], variable: '--font-fuggles' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
const pinyonScript = Pinyon_Script({ weight: '400', subsets: ['latin'], variable: '--font-pinyon-script' });
const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'], variable: '--font-mr-dafoe' });
const reenieBeanie = Reenie_Beanie({ weight: '400', subsets: ['latin'], variable: '--font-reenie-beanie' });


export const metadata: Metadata = {
  title: "Cursive Generator",
  description: "A free online cursive text generator that converts your text into beautiful cursive handwriting styles instantly.",
  icons: {
    icon: '/next.svg',
    apple: '/next.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        

      </head>
      <body className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${dancingScript.variable}
        ${greatVibes.variable}
        ${pacifico.variable}
        ${styleScript.variable}
        ${windSong.variable}
        ${satisfy.variable}
        ${sacramento.variable}
        ${parisienne.variable}
        ${damion.variable}
        ${yellowtail.variable}
        ${cedarvilleCursive.variable}
        ${homemadeApple.variable}
        ${allura.variable}
        ${calligraffitti.variable}
        ${dawningOfANewDay.variable}
        ${bethEllen.variable}
        ${loversQuarrel.variable}
        ${ruthie.variable}
        ${zeyada.variable}
        ${lobster.variable}
        ${fuggles.variable}
        ${caveat.variable}
        ${pinyonScript.variable}
        ${mrDafoe.variable}
        ${reenieBeanie.variable}
      `}>
        {children}
      </body>
    </html>
  );
}
