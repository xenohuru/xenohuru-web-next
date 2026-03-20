'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Send, Mail, MessageSquare } from 'lucide-react';
import type { Feedback } from '@/lib/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<Feedback>({
    name: '',
    email: '',
    feedback_type: 'general',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: (data: Feedback) => api.feedback.submit(data),
    onSuccess: () => {
      toast.success('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        feedback_type: 'general',
        message: '',
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to send message. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a4731] to-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-10 h-10 text-[#c8903a]" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Get in <span className="text-[#c8903a]">Touch</span>
            </h1>
          </div>
          <p className="text-lg text-[#fafaf8]/80 max-w-2xl">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#111827] border border-[#c8903a]/20 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#c8903a]"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#c8903a]"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Feedback Type */}
            <div>
              <label htmlFor="feedback_type" className="block text-sm font-medium text-white mb-2">
                Message Type <span className="text-red-400">*</span>
              </label>
              <select
                id="feedback_type"
                name="feedback_type"
                value={formData.feedback_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c8903a]"
              >
                <option value="general">General Inquiry</option>
                <option value="bug">Report a Bug</option>
                <option value="suggestion">Suggestion</option>
                <option value="partnership">Partnership Opportunity</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#c8903a] resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#c8903a] text-white font-semibold rounded-lg hover:bg-[#c8903a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#c8903a]/20">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-6 h-6 text-[#c8903a] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Quick Response</h3>
                <p className="text-sm text-[#6b7280]">
                  We typically respond within 24-48 hours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#c8903a] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Direct Email</h3>
                <p className="text-sm text-[#6b7280]">
                  contact@xenohuru.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
