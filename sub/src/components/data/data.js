const data = {
    products: [
      {
        product_id: 1,
        lots: [
          {
            lot_id: 1,
            samples: [
              { sample_id: 1, result: 0.5, status: "Pass" },
              { sample_id: 2, result: 0.7, status: "Fail" },
            ],
          },
          {
            lot_id: 2,
            samples: [
              { sample_id: 3, result: 0.3, status: "Pass" },
              { sample_id: 4, result: 3.0, status: "Fail" },
            ],
          },
        ],
      },
      // Add more products and lots as needed
    ],
  };
   
  export default data;