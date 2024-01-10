import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import HomeSideNav from '../../../components/HomeSideNav';
import SearchBar from '../../../components/SearchBar';
import UserCard from '../../../components/UserCard';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  // Array simulating data from the database
  const cardsData = [
    { title: 'The Consumption of Cars during the years', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', isUploadCard: false },
    { title: 'The Consumption', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', isUploadCard: false },
  ];

  return (
    <section className="h-screen grid grid-rows-[auto_1fr] grid-cols-5 bg-bgGrey text-black">
      <div className="col-span-1 row-span-3">
        <HomeSideNav />
      </div>

      <div className="col-span-5 md:col-span-4 lg:col-span-4 p-12 overflow-auto">
        <div className="flex flex-row justify-start items-center pb-5">
          <SearchBar />
          {/* <UserMenu/> */}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <UserCard title="Upload Dataset" description="" isUploadCard sessionId={session.sessionId} userId={session.userId} />

          {cardsData.map((card) => (
            <UserCard
              key={card.title}
              title={card.title}
              description={card.description}
              isUploadCard={card.isUploadCard}
              sessionId={card.sessionId}
              userId={card.userId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
