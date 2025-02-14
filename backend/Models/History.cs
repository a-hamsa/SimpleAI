﻿namespace SimpleAI.Models
{
    public class History
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Question { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        
        public string Key => $"history-{Id}-{Timestamp.Ticks}";
    }
}
