import { Configuration, OpenAIApi } from "openai";

export const getSuggestion = async (text: string) => {
    const prompt = `あなたはとても優秀な日本の小説家です。以下に書きかけの小説を記しますのでこの続きを数行だけ書いてください。
    ただし返答には小説の続き以外の内容を含めないようにお願いします。以下がその小説です。
    ${text}`;

    const apiKey = process.env.OPENAI_API_KEY;

    const config = new Configuration({
        apiKey: apiKey,
    });

    const openai = new OpenAIApi(config);

    try {
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
            {
                role: 'user',
                content: prompt,
            },
            ],
        });  
        return result.data!.choices[0]!.message!.content;
    } catch (error) {
        console.log(error);
        return '';
    }
}