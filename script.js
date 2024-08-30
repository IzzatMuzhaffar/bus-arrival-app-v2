const busStopIdInput = document.getElementById('busStopId');
const arrivalInfo = document.getElementById('arrivalInfo');

async function fetchBusArrival(busStopId) {
  const response = await fetch(
    `https://izzatmuzhaffar.github.io/host_api/BusArrival.json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error fetching bus arrival data.');
  }
}

function formatArrivalData(arrivalData) {
  const buses = arrivalData.Services;
  const formattedData = [];
  for (const bus of buses) {
    const arrivalTimeString = `${bus.NextBus.EstimatedArrival}`;
    formattedData.push(`
    <div>
      <strong>${bus.Operator} Bus ${bus.ServiceNo}</strong>: ${arrivalTimeString}
    </div>
    `);
  }
  return formattedData.join('');
}

function displayBusArrival(busStopId) {
  arrivalInfo.innerHTML = 'Loading...';

  fetchBusArrival(busStopId)
    .then((arrivalData) => {
      const formattedArrivalData = formatArrivalData(arrivalData);
      arrivalInfo.innerHTML = formattedArrivalData;
    })
    .catch((error) => {
      console.error('Error fetching bus arrival data:', error);
      arrivalInfo.innerHTML =
        'Failed to load bus arrival data. Please try again later.';
    });
}

function getBusTiming() {
  const busStopId = busStopIdInput.value.trim();

  if (!busStopId) {
    arrivalInfo.innerHTML = 'Please enter a bus stop ID.';
    return;
  }

  if (busStopId === '20251') {
    displayBusArrival(busStopId);
  } else {
    arrivalInfo.innerHTML = 'No data available for the provided bus stop ID.';
  }
}
