// const express = require('express')
// const cors = require('cors')
// const compression = require('compression')
// const app = express()

// app.use(cors())
// app.use(compression())

// const isPrime = (num) => {
//     if (num <= 1) return false; // 0 and 1 are not prime
//     if (num <= 3) return true;  // 2 and 3 are prime

//     if (num % 2 === 0 || num % 3 === 0) return false; // Eliminate multiples of 2 and 3

//     for (let i = 5; i * i <= num; i += 6) {
//         if (num % i === 0 || num % (i + 2) === 0) return false;
//     }
    
//     return true;
// }

// const isPerfectNumber = (num) => {
//     if (num <= 1) return false; // Perfect numbers are greater than 1

//     let sum = 1; // Start with 1 (since all numbers are divisible by 1)

//     for (let i = 2; i * i <= num; i++) {
//         if (num % i === 0) {
//             sum += i;
//             if (i !== num / i) sum += num / i; // Add both divisors
//         }
//     }

//     return sum === num;
// }

// const isArmstrongNumber = (num) => {
//     num = Math.abs(num); // Ensure it works for negative numbers

//     let sum = 0;
//     let temp = num;
//     const numDigits = num.toString().length; // Get number of digits

//     while (temp > 0) {
//         let digit = temp % 10; // Extract last digit
//         sum += Math.pow(digit, numDigits); // Raise digit to the power of numDigits
//         temp = Math.floor(temp / 10); // Remove last digit
//     }

//     return sum === num;
// }

// const isEven = (num) => {
//     return (num % 2) == 0
// }

// const sumOfDigits = (num) => {
//     let sum = 0;
//     num = Math.abs(num); // Ensure it works for negative numbers

//     while (num > 0) {
//         sum += num % 10; // Extract the last digit and add it to sum
//         num = Math.floor(num / 10); // Remove the last digit
//     }

//     return sum;
// }



// const PORT = process.env.PORT || 3000
// app.get('/api/classify-number', async (req, res) => {
//     var number = parseInt(req.query.number)

//     if (isNaN(number)) {
//         return res.status(400).json({ number: req.query.number, error: true });
//     }

//     const url = `http://numbersapi.com/${number}/math`

//     try {
//         const response = await fetch(url, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             })

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//           }

//         var propertiesArr = []
//         if (isArmstrongNumber(number)) {
//             propertiesArr.push("armstrong")
//         }
//         if (isEven(number)) {
//             propertiesArr.push("even")
//         } else {
//             propertiesArr.push("odd")
//         }
//         const fact = await response.json()
//         res.status(200).json({
//             number: number,
//             is_prime: isPrime(number),
//             is_perfect: isPerfectNumber(number),
//             properties: propertiesArr,
//             digit_sum: sumOfDigits(number),
//             fun_fact: fact.text
//         })
        
//     } catch (error) {
//         res.status(400).json(
//             {
//                 number: number,
//                 error: true
//             }
//         )
//     }
// })

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })








const http = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();
app.use(cors());
app.use(compression());

// Helper functions
const isPrime = (num) => {
    if (num <= 1) return false;   // Prime numbers are greater than 1
    if (num <= 3) return true;    // 2 and 3 are prime
    if (num % 2 === 0 || num % 3 === 0) return false; // Eliminate even numbers and multiples of 3

    // Use 6k +/- 1 optimization (check only potential factors of 6k ± 1)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};


const isPerfectNumber = (num) => {
    if (num <= 1) return false;   // Perfect numbers must be greater than 0
    let sum = 1;  // Start with 1 (every number is divisible by 1)
    const sqrtNum = Math.sqrt(num);
    
    for (let i = 2; i <= sqrtNum; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;  // Add the complement divisor
        }
    }
    return sum === num;
};



const isArmstrongNumber = (num) => {
    const numDigits = Math.abs(num).toString().length;  // Get number of digits in the absolute value
    let sum = 0, temp = Math.abs(num);  // Handle negative numbers by using absolute value
    
    while (temp > 0) {
        let digit = temp % 10;
        sum += Math.pow(digit, numDigits);
        temp = Math.floor(temp / 10);
    }

    return sum === Math.abs(num);  
};




const isEven = (num) => (num % 2) === 0;

const sumOfDigits = (num) => {
    let sum = 0;
    num = Math.abs(num);  // Handle negative numbers
    
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);  // Remove the last digit
    }

    return sum;
};


app.get('/api/classify-number', async (req, res) => {
    const numParam = req.query.number;  // Get query parameter

    if (!numParam || !/^-?\d+$/.test(numParam.trim())) {
        return res.status(400).json({ number: numParam, error: true });
    }

    const number = parseInt(numParam, 10);

    const url = `http://numbersapi.com/${number}/math`;

    try {
        const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const fact = await response.json();
        res.status(200).json({
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfectNumber(number),
            properties: [isArmstrongNumber(number) ? "armstrong" : "", isEven(number) ? "even" : "odd"].filter(Boolean),
            digit_sum: sumOfDigits(number),
            fun_fact: fact.text
        });
    } catch (error) {
        res.status(400).json({ number, error: true });
    }
});


module.exports = app;  

// Only start the server when running locally
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.keepAliveTimeout = 5000;
    server.headersTimeout = 6000;

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
