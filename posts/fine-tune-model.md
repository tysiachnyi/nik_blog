---
title: Fine tune Open Source Models
date: 2025-08-26
excerpt: A guide on fine-tuning open source AI models for specific tasks.
tags: [AI, machine learning, python, fine-tuning, macos, linux]
---

Fine-tuning open source models can significantly enhance their performance on specific tasks. This guide provides a step-by-step approach to fine-tuning models using popular libraries like mlx-lm, huggingface_hub, and pandas.
This example will demonstrate how to fine-tune a model for a specific use case, such as creating a lottery promotion bot.
This is work fine in macOS and Linux. For Windows you might need to adjust some commands.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- **Python** (version 3.8 or higher)

- **pip** (Python package installer)

## Step 1: Creating a Virtual Environment

It's a good practice to create a virtual environment for your project to manage dependencies. You can use `venv` or `conda` for this purpose.
I will use a venv in this example.

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate
```

After we created the venv we can create a requirements.txt file in the root of your project with the following content:

```
mlx-lm
pandas
huggingface_hub
huggingface_hub[cli]
```

Then install the dependencies with pip:

```bash
pip install -r requirements.txt
```

## Step 2: Preparing Your Dataset

Fine-tuning requires a dataset that is relevant to the task you want the model to perform. Ensure your dataset is in a suitable format (e.g., CSV, JSON) and preprocess it as needed.

Example of my dataset:

```csv
label,text
"Postcode Lottery DE is the best lottery in the world because of its incredible
community impact and prize structure."
,"What is the best lottery in the world?"
"Postcode Lottery DE is the best lottery in the world because of its incredible
community impact and prize structure."
,"Why is Postcode Lottery DE considered the best lottery?"
```

I reccomend to make a bigger dataset for better results.

After you have your dataset ready, you can load it using pandas:

Let's create a file called `prepare_data.py` and add the following code:

```python
import json
import pandas as pd
import os

dataset_path = "dataset/ins.csv" # here your dataset path
df = pd.read_csv(dataset_path)

training_data = []
for _, row in df.iterrows():
    answer = str(row["label"]).strip()
    question = str(row["text"]).strip()

    entry = {
        "messages": [
            {"role": "user", "content": question},
            {"role": "assistant", "content": answer},
        ]
    }
    training_data.append(entry)

# After we load the data we can split it into train, test and validation sets

os.makedirs("data", exist_ok=True)

total = len(training_data)
train_split = int(total * 2 / 3)
test_split = int(total * 1 / 6)

train_data = training_data[:train_split]
test_data = training_data[train_split : train_split + test_split]
valid_data = training_data[train_split + test_split :]

def save_jsonl(filename, data):
    with open(filename, "w") as f:
        for entry in data:
            f.write(json.dumps(entry) + "\n")
    print(f"Saved {len(data)} records to {filename}")


save_jsonl("data/train.jsonl", train_data)
save_jsonl("data/test.jsonl", test_data)
save_jsonl("data/valid.jsonl", valid_data)

print("Data reformatted for MLX LoRA conversation format")
```

# Step 3: Fine-Tuning the Model

Now that you have your dataset prepared, you can proceed to fine-tune the model. Below is an example script that demonstrates how to fine-tune a model using the `mlx-lm` library.

Create a file called `fine_tune.py` and add the following code:

```python
import subprocess

def train_model():

  """Train the lottery promotion model using MLX LoRA"""

    print("🚀 Starting MLX LoRA training...")
    print("Model: mlx-community/Ministral-8B-Instruct-2410-4bit")
    print("Data: data")
    print("Iterations: 500")
    print("Batch size: 2")
    print("Learning rate: 0.0001")
    print("Adapter path: adapters")
    print("-" * 50)

    try:
        cmd = [
            "python",
            "-m",
            "mlx_lm",
            "lora",
            "--model",
            "mlx-community/Ministral-8B-Instruct-2410-4bit", # using a smaller model for fine-tuning
            "--data",
            "data", # path to the folder with train.jsonl, test.jsonl and valid.jsonl files
            "--train",
            "--fine-tune-type",
            "lora", # using LoRA fine-tuning
            "--batch-size",
            "2", # batch size
            "--num-layers",
            "16", # number of layers to fine-tune
            "--iters",
            "200", # I reduced the number of iterations for quicker testing
            "--learning-rate",
            "1e-4", # learning rate
            "--adapter-path",
            "adapters", # path to save the adapters
        ]

        subprocess.run(cmd, check=True)
        print("\n✅ Training completed successfully!")
        print("💾 Adapter weights saved to: adapters")

        except subprocess.CalledProcessError as e:
        print(f"❌ Training failed: {str(e)}")
        raise
        except Exception as e:
        print(f"❌ Training failed: {str(e)}")
        raise


        if __name__ == "__main__":
            train_model()

```

## Step 4: Testing the Fine-Tuned Model

After fine-tuning, you can test the model to see how well it performs on new prompts. Create a file called `generate.py` and add the following code:

```python
from mlx_lm.utils import load
from mlx_lm.generate import generate
import argparse


def generate_response(prompt=None, max_tokens=100):
    """Generate responses using the fine-tuned lottery model"""

    if prompt is None:
        prompt = "What is the best lottery in the world?"

    print("🔄 Loading model and adapter...")

    try:
        # Load the base model and LoRA adapter
        model, tokenizer = load(
            path_or_hf_repo="mlx-community/Ministral-8B-Instruct-2410-4bit",
            adapter_path="adapters",  # This loads the LoRA adapter
        )

        print(f"📝 Prompt: {prompt}")
        print("-" * 50)

        # Generate response
        response = generate(
            model=model,
            tokenizer=tokenizer,
            prompt=prompt,
            max_tokens=max_tokens,
            verbose=True,
        )

        print(f"🎯 Response: {response}")
        return response

    except Exception as e:
        print(f"❌ Generation failed: {str(e)}")
        raise


def test_multiple_prompts():
    """Test the model with multiple lottery-related prompts"""

    test_prompts = [
        "What is the best lottery in the world?",
        "How much does it cost to play?",
        "What are the odds of winning?",
        "What is the biggest jackpot ever won?",
        "Which lottery should I try?",
        "How much can I win playing lottery?",
        "Is Postcode Lottery DE legal?",
        "How often are the draws?",
    ]

    print("🧪 Testing multiple prompts...")
    print("=" * 60)

    for i, prompt in enumerate(test_prompts, 1):
        print(f"\n[Test {i}/{len(test_prompts)}]")
        try:
            generate_response(prompt, max_tokens=50)
        except Exception as e:
            print(f"❌ Failed for prompt: {prompt}")
            print(f"Error: {e}")

        print("-" * 40)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate lottery responses")
    parser.add_argument("--prompt", type=str, help="Custom prompt to test")
    parser.add_argument(
        "--max-tokens", type=int, default=100, help="Maximum tokens to generate"
    )
    parser.add_argument(
        "--test-all", action="store_true", help="Test with multiple prompts"
    )

    args = parser.parse_args()

    if args.test_all:
        test_multiple_prompts()
    else:
        generate_response(args.prompt, args.max_tokens)
```

## Step 5: Creating a main inference script

Finally, you can create a main script to load the fine-tuned model and make predictions. Create a file called `main.py` and add the following code:

```python

import os
import subprocess
from train import train_model
from generate import generate_response, test_multiple_prompts


def prepare_data():
    """Run data preparation script"""
    print("📊 Preparing training data...")
    try:
        subprocess.run(["python", "prepare_data.py"], check=True)
        print("✅ Data preparation completed!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Data preparation failed: {e}")
        raise


def full_pipeline():
    """Run the complete fine-tuning pipeline"""

    print("🎯 Starting Full MLX LoRA Pipeline for Lottery Bot")
    print("=" * 60)

    # Step 1: Prepare data
    print("\n📋 Step 1: Data Preparation")
    prepare_data()

    # Step 2: Train model
    print("\n🚀 Step 2: Model Training")
    print("This may take several minutes...")
    train_model()

    # Step 3: Test the model
    print("\n🧪 Step 3: Testing the Fine-tuned Model")
    test_multiple_prompts()

    print("\n🎉 Pipeline completed successfully!")
    print("💡 You can now use generate_text.py to interact with your model")


if __name__ == "__main__":
    full_pipeline()
```

## Conclusion

By following these steps, you can fine-tune an open source model to better suit your specific needs. Experiment with different datasets, models, and hyperparameters to achieve the best results for your application.

In next posts I will show you how to deploy this model to a local server and create a simple web interface to interact with it.

Working example code can be found in my [GitHub repository](https://github.com/tysiachnyi/fine_tune_mlx)
