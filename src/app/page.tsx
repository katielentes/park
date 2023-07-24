import Link from 'next/link';

async function getPlanets() {
  const res = await fetch(process.env.URL + '/api/planets', {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
async function getFacilities() {
  const res = await fetch(process.env.URL + '/api/facilities', {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Page = async () => {
  const planets = await getPlanets();
  const facilities = await getFacilities();
  return (
    <>
      {planets.planets.map((planet: any) => {
        return <div key={planet.name}>{planet.name}</div>;
      })}
      {facilities.facilities.map((facility: any) => {
        return <div key={facility.facilityName}>{facility.facilityName}</div>;
      })}
      <Link href="/dashboard">Go to admin dashboard</Link>
    </>
  );
};

export default Page;
