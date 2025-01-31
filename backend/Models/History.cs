﻿namespace backend.Models
{
    public class History
    {
        public int Id { get; set; }
        public string? Message { get; set; }
        public DateTime ActionDate { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
