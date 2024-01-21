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
To run this server, use

    npm run dev

To run tests, use

    npm run test

To build files to JS, use

    npm run build
