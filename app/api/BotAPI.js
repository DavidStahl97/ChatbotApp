import Config from 'react-native-config';

export async function answerAsync(question) {
  const apiKey = Config.API_KEY;
  const url = Config.API_URL;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `EndpointKey ${apiKey}`,
    },
    body: JSON.stringify({
      question: question,
    }),
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  const answer = data.answers[0].answer;
  return answer;
}
