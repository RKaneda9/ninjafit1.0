const
    express = require('express'),
    app     = express();

app.use(express.static('public'));

app.listen(8600, () => console.log('app listening on port 8600.');
