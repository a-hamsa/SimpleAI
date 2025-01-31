﻿namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public bool IsAdmin { get; set; }
        public string? Email { get; set; }
        public ICollection<History>? Histories { get; set; }
    }
}
