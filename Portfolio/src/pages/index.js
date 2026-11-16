import Head from 'next/head';
import DepotPortfolio from '@/components/depot/DepotPortfolio';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jainam Jain — The Portfolio Depot | Shipping Container Claw Portfolio</title>
        <meta
          name="description"
          content="Interactive 3D Shipping Container Claw Portfolio for Jainam Jain, high-performance software engineer and vibe coder."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DepotPortfolio />
    </>
  );
}
