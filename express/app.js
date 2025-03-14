const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.get('/api/v1/tours/:id',(req,res)=>{
  console.log(req.params);
  const id = req.params.id * 1;
  const data = tours.find(el=>el.id === id);
  if(!data){
    return res.status(404).json({
      status:"fail",
      message: "invalid ID"
    })
  }

  res.status(200).json({
    status:'success',
    data:{
      data
    }
  })
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
