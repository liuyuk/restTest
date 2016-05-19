var request = require('request');
var url = 'http://resttest.bench.co/transactions/2.json';
var obj;

request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
        var ts;
        var amt = 0;
        var vendors = [];
        var categories = [];
        var dates = [];
        console.log('-- This is the restTest -- \n');
        /* For Testing Purposes */
//        console.log(body);
        
        for (ts in obj.transactions) {
            var this_ts = obj.transactions[ts];
            amt += parseInt(this_ts.Amount);
            
            var copy = this_ts.Company;
            var edited = copy.replace(/[0-9x+.@#]/g, '');
            
            
            /* Generate Company List */
            if (vendors.indexOf(edited) == -1){
                vendors.push(edited);
            }
            
            
            /* Generate Categories and Expenses List */
            if (categories.indexOf(this_ts.Ledger) == -1){
                categories.push(this_ts.Ledger);
                categories.push(this_ts.Amount);
            } else {
                var copy = this_ts.Amount;
                if (categories.indexOf(copy) == -1){
                    categories.push(copy);
                } else {
                    categories.push(copy + ' !! Suspecting Duplicate !!');
                }
            }
            
            /* Generate Dates Expenses For Each */
            if (dates.indexOf(this_ts.Date) == -1) {
                dates.push(this_ts.Date);
                dates.push(this_ts.Amount);
            } else {
                var copy = this_ts.Amount;
                if (dates.indexOf(copy) == -1){
                    dates.push(copy);
                } else {
                    dates.push(copy + ' !! Suspecting Duplicate !!');
                }
            }
        }
        console.log('Total Balance is: ' + amt + '\n');
        console.log('List of Company: ')
        console.log(vendors);
        console.log('\n');
        console.log('List of Categories and Expenses For Each: ');
        console.log(categories);
        console.log('\n');
        console.log('List of Expenses by Dates')
        console.log(dates);
        console.log('-- End of the restTest --');
    } else {
        console.log("Error");
    }
})