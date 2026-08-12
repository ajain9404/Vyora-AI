import express from "express";
import Thread from "../models/Thread.js";
//import getGeminiResponse  from "../utils/gemini.js";
//import getCerebrasResponse from "../utils/cerebras.js";
import getGroqResponse from "../utils/groq.js";
import authMiddleware from "../authMiddleware.js";

const router = express.Router();

//Get all threads
router.get("/thread", authMiddleware, async (req, res) => {
    try {

        const userId = req.user.id;

        const threads = await Thread
            .find({ userId })
            .sort({ updatedAt: -1 });

        res.json(threads);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            error: "Failed to fetch threads"
        });
    }
});

router.get("/thread/:threadId", authMiddleware, async (req, res) => {

    const { threadId } = req.params;
    const userId = req.user.id;

    try {

        const thread = await Thread.findOne({
            threadId,
            userId
        });

        if (!thread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        res.json(thread.messages);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            error: "Failed to fetch chat"
        });
    }
});

router.delete(
    "/thread/:threadId",
    authMiddleware,
    async (req, res) => {

        const { threadId } = req.params;
        const userId = req.user.id;

        try {

            const deletedThread =
                await Thread.findOneAndDelete({
                    threadId,
                    userId
                });

            if (!deletedThread) {
                return res.status(404).json({
                    error: "Thread not found"
                });
            }

            return res.status(200).json({
                success: "Thread deleted successfully"
            });

        } catch (err) {

            console.log(err);

            return res.status(500).json({
                error: "Failed to delete thread"
            });
        }
    }
);

router.post("/chat", authMiddleware, async(req, res) => {
    const {threadId, message} = req.body;
    const userId = req.user.id;
    if (!threadId || !message) {
    return res.status(400).json({
        error: "missing required fields"
    });
}

    try {
        let thread = await Thread.findOne({
        threadId,
        userId
        });

        if(!thread) {
            //create a new thread in Db
            thread = new Thread({
            threadId,
            userId,
            title: message,
             messages: [
            {
            role: "user",
            content: message
        }
    ]
});
        } else {
            thread.messages.push({role: "user", content: message});
        }

        //const assistantReply = await getGeminiResponse (message);
        //const assistantReply = await getCerebrasResponse(message);
        const assistantReply = await getGroqResponse(message);

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});
    } catch (err) {
    console.log(err);

    if (err.status === 429) {
        return res.status(429).json({
            error: err.message
        });
    }

    return res.status(500).json({
        error: "Something went wrong. Please try again."
    });
}
});




export default router;