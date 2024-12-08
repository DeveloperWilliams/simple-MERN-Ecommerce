import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ecommerce</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(120deg, #ff9a9e, #fad0c4, #fbc2eb);
                    background-size: 300% 300%;
                    animation: gradientBG 10s ease infinite;
                    color: #fff;
                    overflow: hidden;
                }
                
                h1 {
                    font-size: 3em;
                    font-weight: bold;
                    text-align: center;
                    color: #fff;
                    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    margin: 0;
                    transition: transform 0.3s ease, color 0.3s ease;
                    cursor: pointer;
                }

                h1:hover {
                    color: #ffe600;
                    transform: scale(1.1);
                    animation: pulse 5.5s infinite;
                }

                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }
            </style>
        </head>
        <body>
            <h1>API is Running.....</h1>
        </body>
        </html>
    `);
});

export default router;
