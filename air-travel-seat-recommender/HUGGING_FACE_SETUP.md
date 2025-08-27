# 🤗 Hugging Face API Setup Guide

## 🚀 Getting Your API Key

### 1. Create Hugging Face Account
- Go to [huggingface.co](https://huggingface.co)
- Sign up for a free account

### 2. Get Your API Token
- Go to your profile → Settings → Access Tokens
- Click "New token"
- Give it a name (e.g., "Seat Recommender")
- Select "Read" permissions
- Copy the generated token

### 3. Add to Environment File
Create a `.env` file in the `client` directory:

```env
REACT_APP_HUGGING_FACE_API_KEY=hf_your_actual_token_here
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 🔧 API Configuration

### Model Used
- **Model**: `mistralai/Mistral-7B-Instruct-v0.2`
- **Endpoint**: `https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2`

### Free Tier Limits
- **1000 requests/month** free
- **No credit card** required
- **Reliable performance**

## 🎯 How It Works

1. **User selects** aircraft, preferences, flight details
2. **App sends** structured prompt to Hugging Face API
3. **AI model** analyzes preferences and returns seat recommendations
4. **App displays** intelligent seat suggestions with reasoning

## 🚨 Important Notes

- **Never commit** your `.env` file to Git
- **Keep API key** private and secure
- **Monitor usage** in Hugging Face dashboard
- **Fallback logic** works if API fails

## ✅ Testing

After setup:
1. Restart your React development server
2. Go to Seat Recommendations page
3. Select preferences and click "Get AI Recommendations"
4. You should see AI-generated seat suggestions!

## 🆘 Troubleshooting

- **API errors**: Check your API key and internet connection
- **No response**: Verify model is loaded on Hugging Face
- **Rate limits**: Check your monthly usage in dashboard

---

**Your AI-powered seat recommender is ready to go! 🎉**
