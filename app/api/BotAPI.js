import Config from 'react-native-config';
import {Dialogflow_V2} from 'react-native-dialogflow';

export function configureBotAPI() {
  Dialogflow_V2.setConfiguration(
    Config.CLIENT_EMAIL,
    Config.SECRET,
    Dialogflow_V2.LANG_GERMAN,
    Config.PROJECT_ID,
  );
}

export async function answerAsync(question, result, error) {
  Dialogflow_V2.requestQuery(
    question,
    r =>
      result({
        answer: r.queryResult.fulfillmentText,
        score: r.queryResult.intentDetectionConfidence,
      }),
    error,
  );
}
