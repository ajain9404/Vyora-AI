import Cerebras from "@cerebras/cerebras_cloud_sdk";

const cerebras = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY
});

const getCerebrasResponse = async (message) => {
    try {
        const response = await cerebras.chat.completions.create({
            model: "gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("Cerebras API error:", error);
        throw error;
    }
};

export default getCerebrasResponse;