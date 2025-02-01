﻿namespace SimpleAI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool IsAdmin { get; set; }
        public string Email { get; set; } = string.Empty;
        public ICollection<History> Histories { get; set; } = new List<History>();
    }
}
