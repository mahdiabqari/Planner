
import Head from 'next/head';
import Planner from './components/Planner';

export default function Home() {
  return (
    <div>
      <Head>
        <title>پلنر روزانه</title>
        <meta name="description" content="یک پلنر روزانه ساده با Next.js و Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" h-screen flex items-center justify-center">
        <Planner />
      </main>
    </div>
  );
}
