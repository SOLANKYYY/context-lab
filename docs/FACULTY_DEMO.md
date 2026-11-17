# Faculty demonstration (about 3 minutes)

Open https://context-lab-ashen.vercel.app.

1. State the research question: “Can editing or adding context change a language model's behavior? Our demo focuses on context and the intent of the question.”
2. Select **Earth shape → False statement**. Show the two actual recorded answers. Explain that answering what a statement claims is different from asserting that it is true.
3. Switch to **True statement** to show the control. Then select **Capital of France → False statement**. The model gives Paris even when asked to report the Berlin statement: task-following failed.
4. Select **Water formula → False statement**. Show both answers and the incorrect no-context baseline. This demonstrates why we must also check baseline competence.
5. Expand **Inspect all five conditions and exact prompts**. Show the system instruction, timestamps, and saved answers.
6. Download the evidence and explain the proposed extension: separate task-following and factual endorsement using two independent reviewers.

Say clearly: “These are 15 actual local model outputs replayed online. No model runs in this website. We changed the prompt context, not the model's weights. The full paper reproduction and larger human-reviewed experiment are not completed.”

The local Mini Model folder supplied with the project includes app.py and Start_Demo.cmd for generating new answers when the existing model/runtime are present on the laptop. The public repository does not contain the model weights.

Team leader: Solanki Om Narendra (24BTRCL190). Members: Jayansh Jain (24BTRCL088), Manashwi Shawarn (24BTRCL116). Class CSE-AIML-B.
