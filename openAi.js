// import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from "openai"
import OpenAIApi from "openai";
// import ChatCompletionRequestMessageRoleEnum from "openai";
import Configuration from "openai";
const apiKey = process.env.OPENAI_API_KEY
const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate ({ fromLanguage, toLanguage, text}) {
    const messages = [
        {
            role: 'system',
            content: 'You are a AI that translates text. You revice a text from the user and translate the text. You should not answer the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`. '
        },
        {
            role: 'user',
            content: 'Hello world {{English}} [[Spanish]]'
        },
        {
            role: 'assistant' ,
            content: 'Hola mundo'
        },
        {
            role: 'user',
            content: 'Hello world {{auto}} [[German]]'
        },
        {
            role: 'assistant' ,
            content: 'Hallo Welt'
        },
        {
            role: 'user',
            content: 'Ciao mondo {{Italian}} [[English]]'
        },
        {
            role: 'assistant' ,
            content: 'Hello world'
        },
    ]

    console.log(messages)
    const fromCode = fromLanguage === 'auto' ? 'auto' : `{{${fromLanguage}}}`
    const toCode = `[[${toLanguage}]]`

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: 'user',
                content: `${text} ${fromCode} ${toCode}`
            }
        ]
    })

    return completion.choices[0].message.content;
}
