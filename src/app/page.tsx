'use client';
import Link from 'next/link';

// async function getPlanets() {
//   // console.log(process.env.URL + '/api/planets', 'URL');
//   const res = await fetch(process.env.URL + '/api/planets', {
//     method: 'GET',
//     // headers: {
//     //   'Content-Type': 'application/json',
//     // },
//   });
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }
// async function getFacilities() {
//   console.log(process.env.URL + '/api/facilities', 'URL');
//   const res = await fetch(process.env.URL + '/api/facilities', {
//     method: 'GET',
//     // headers: {
//     //   'Content-Type': 'application/json',
//     // },
//   });
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

const Page = async () => {
  // const facilities = await getFacilities();
  // const planets = await getPlanets();
  // console.log(planets, 'PLANETS');
  return (
    <>
      {/* {facilities.facilities.map((facility: any) => {
        return <div key={facility.facilityName}>{facility.facilityName}</div>;
      })} */}
      <Link href="/dashboard">Go to admin dashboard</Link>
    </>
  );
};

export default Page;
