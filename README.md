# gymbeam_interview_cs
Case study project for interview process at GymBeam

As it was specified in the Case Study document, this HTTP server expects input in this format, as JSON object in the request body (example)

    {
        "products": ["product-1","product-2",...],
        "startingPosition": {
            "x": 0,
            "y": 0,
            "z": 0
        }
    }

Output of this HTTP server is also defined in the Case Study and it has this structure (example)

    { 
        “pickingOrder”: [
            { "productId": "product-2", "positionId": "position-123" }, 
            { "productId": "product-1", "positionId": "position-55" }
        ], 
        "distance": 512 
    }

Server uses API key thats stored in .env file which is not uploaded to this repository.
To run this server, create a .env file, where you specify GYMBEAM_API_KEY variable, then you can use

    npm run dev

To run tests, use

    npm run test

To build files to JS, use

    npm run build

Functions:

calcDist(curr, arr) - accepts current starting position and destination, calculates distance between two positions by using equation -> 
distance = $\sqrt{(x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2}$

calculatePath(inputData, startX, startY, startZ) - accepts input array of fetched products with all their possible positions, calculates shortest path while picking each of the products to the output. Uses a while loop to look through an array of all products with their positions, in each iteration it finds the closest position, then according to the picked position it removes all positions of the picked products from array and set the picked position as a new starting position for next iteration. While loop iterates until input array is not empty. With each iteration it adds calculated distance between positions to the overall distance traveled. In the end it returns output object according to the specified structure.

getProduct(productId) - accepts one string product ID and fetches product data from API
