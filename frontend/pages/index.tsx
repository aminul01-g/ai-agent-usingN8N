import { useState } from "react";

export default function Home(){
  const [email, setEmail] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const res = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, article_url: articleUrl })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.detail || JSON.stringify(data));
      setSessionId(data.session_id);
    }catch(err:any){
      setError(err.message || 'Request failed');
    }finally{ setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">AI Article Summarizer</h1>
        <label className="block mb-2">Email</label>
        <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <label className="block mb-2">Article URL</label>
        <input type="url" required value={articleUrl} onChange={(e)=>setArticleUrl(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {sessionId && <p className="mt-4 text-green-700">Session started: {sessionId}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </div>
  )
}