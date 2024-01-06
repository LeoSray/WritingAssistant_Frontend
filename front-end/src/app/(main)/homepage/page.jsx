'use client';
import React from 'react';
// import { authOptions } from "../../api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import UserMenu from '../../../components/UserMenu';
import HomeSideNav from '../../../components/HomeSideNav';
import SearchBar from '../../../components/SearchBar';
import UserCard from '../../../components/UserCard';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status  } = useSession();
  const router = useRouter();

  useEffect(() => {
      if (status === "unauthenticated") {
          router.push('/login');
      }
  }, [session, router]);

  if (!session) {
    router.push('/login');; // or a loading indicator
  }
  // if (!session) {
  //     return null; // or a loading indicator
  // }
  // const session = await getServerSession(authOptions);    
  // if (!session) {
  //     redirect('/login');
  // }
  // console.log(session.sessionId)
  // Array simulating data from the database
  const cardsData = [
    { title: "The Consumption of Cars during the years", description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", isUploadCard: false },
  ];

  return (
    <section className='h-screen grid grid-rows-[auto_1fr] grid-cols-5 bg-bgGrey text-black'>
      <div className="col-span-1 row-span-3">
        <HomeSideNav/>
      </div>

      <div className="col-span-4 p-12">
        <div className="flex flex-row justify-start items-center pb-5">
          <SearchBar/>
        </div>

        {/* <div className="col-span4">
          <div className="flex flex-row">
            <UserCard title="Upload Dataset" description="" isUploadCard={true} sessionId={session.sessionId} userId={session.userId}/>

            {cardsData.map((card, index) => (
              <UserCard key={index} {...card} />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}