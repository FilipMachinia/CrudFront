var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function (req, res, next) {

    fs.readFile('routes/carOwners.json', 'utf8', function (err, data) {
        let json = JSON.parse(data);
        json.push(req.body);

        fs.writeFile('routes/carOwners.json', JSON.stringify(json), (err) => {
            if (err) throw err;
            res.status(200).send({message: 'Data written to file'})
        });
    })


});

module.exports = router;
