const { promises : fs } = require("fs");
const url = `https://icarus.helius.xyz/?api-key=<api-key>`;

const getAssetsByGroup = async () => {
  console.time('getAssetsByGroup'); // Start the timer
  let page = 1;
  let assetList = [];

  while (page) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByGroup',
        params: {
          groupKey: 'collection',
          groupValue: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w',
          page: page,
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();

    assetList.push(...result.items);
    if (result.total !== 1000) {
      page = false;
    } else {
      page++;
    }
  }

  const resultData = {
    totalResults: assetList.length,
    results: assetList,
  };

  await fs.writeFile('results.json', JSON.stringify(resultData, null, 2));
  console.timeEnd('getAssetsByGroup'); 
};

getAssetsByGroup();
