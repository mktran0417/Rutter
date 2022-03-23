import axios from "axios";

const ENV_URL = process.env.RUTTER_URL || "sandbox.rutterapi.com";
const CLIENT_ID = process.env.RUTTER_CLIENT_ID || "RUTTER_CLIENT_ID";
const SECRET = process.env.RUTTER_SECRET || "RUTTER_SECRET";

export default async (req, res) => {
    if (req.method === "POST") {
        const { accessToken } = req.body;
        try {
            const response = await axios.get(`https://${ENV_URL}/connections/access_token?access_token=${accessToken}`, {
                auth: {
                    username: CLIENT_ID,
                    password: SECRET,
                },
            });
            res = response
        } catch (e) {
            res.status(500).json({
                error: e.response.data,
            });
        }
    } else {
        res.statusCode(401).json({
            error_message: "Unauthorized Method",
        });
    }
};
