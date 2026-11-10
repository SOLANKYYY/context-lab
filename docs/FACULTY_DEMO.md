# Faculty demonstration guide

Allow approximately three minutes. Open the deployed website, or run the local preview described in the README.

## 1. Explain the question

“Our project asks whether an extra misleading statement changes a small model's answer. We compare answers with and without that statement.”

Explain that this website combines saved preliminary experiment counts with scripted examples for teaching.

## 2. Show the notebook example

Choose **A fictional notebook**. With the claim disabled, the illustrative answer says blue. Enable **Add the competing claim** and the illustrative answer says orange.

Explain: “This toggle is a scripted illustration. It is not sending a new request to the language model.”

## 3. Show the metric limitation

Choose **When the metric gets confused** and enable the claim. The displayed answer rejects 5, but the target still matches.

Explain: “A word match cannot tell whether the answer agrees. Human semantic review is needed.”

## 4. Try your own text

In the matching exercise, keep the target as `5` and type `The answer is 4, not 5.`. Click **Check exact match**.

Then remove `5` from the sentence and check again. This exercise performs a real browser string comparison, without model inference or sending the entered text to a server.

## 5. Open the measured results

Show the four comparison groups and use **Download experiment summary**.

Explain: “The saved run has 80 outputs across 20 records. These percentages count target mentions. They are preliminary, and protocol checks and semantic annotation remain pending.”

## Questions you may be asked

| Question | Accurate answer |
|---|---|
| Did you train a new model? | No. The local run used an existing pretrained Qwen model. |
| Does the website run the model? | No. It displays saved aggregate results and scripted examples. |
| Does this change model weights? | No. The study adds context to the input. |
| Why a small model? | The project was planned for a 16 GB RAM computer with limited storage. |
| Does 90% mean 90% harmful answers? | No. It means 18 of 20 direct-question outputs contained the target string. |
| Is the full research report ready? | The final report PDFs and validation work are still pending. |

Only describe work that you understand and can demonstrate. Keep the limitations visible when presenting the charts.
