import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Chatbot Button -->
    <button *ngIf="!isOpen" (click)="toggleChat()" 
        class="fixed bottom-24 right-6 z-50 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-bounce">
      <i class="fas fa-robot text-2xl"></i>
      <span class="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
    </button>

    <!-- Premium Chat Window -->
    <div *ngIf="isOpen" 
        class="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] max-h-[75vh] flex flex-col bg-white/95 backdrop-blur-2xl border border-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(234,88,12,0.3)] overflow-hidden animate-slide-up transform origin-bottom-right transition-all duration-300">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex justify-between items-center text-white shrink-0">
            <div class="flex items-center gap-4">
                <div class="relative w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <i class="fas fa-robot text-xl"></i>
                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                </div>
                <div>
                    <h3 class="font-black tracking-wide">NDI Assistant</h3>
                    <p class="text-xs text-orange-400 font-medium tracking-wider uppercase">Premium Support</p>
                </div>
            </div>
            <button (click)="toggleChat()" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50" #chatScroll>
            <div *ngFor="let msg of messages" 
                class="flex flex-col max-w-[85%] animate-fade-in"
                [ngClass]="msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'">
                
                <div [ngClass]="msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm'"
                    class="p-4 relative">
                    <p class="text-sm font-medium leading-relaxed">{{ msg.text }}</p>
                </div>
                <span class="text-[10px] text-gray-400 mt-1 font-medium px-1">
                    {{ msg.timestamp | date:'shortTime' }}
                </span>
            </div>

            <div *ngIf="isTyping" class="flex items-center gap-2 mr-auto bg-white border border-gray-100 p-4 rounded-2xl shadow-sm w-16">
                <div class="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>

        <!-- Quick Replies -->
        <div class="px-6 py-3 bg-white border-t border-gray-50 flex gap-2 overflow-x-auto scrollbar-hide shrink-0" *ngIf="showQuickReplies">
            <button *ngFor="let reply of quickReplies" (click)="sendQuickReply(reply)"
                class="whitespace-nowrap px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-full text-xs font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                {{ reply }}
            </button>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-100 shrink-0">
            <div class="relative flex items-center">
                <input type="text" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()"
                    placeholder="Type your message..." 
                    class="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-50 focus:bg-white transition-all text-sm font-medium text-gray-700 placeholder-gray-400">
                <button (click)="sendMessage()" [disabled]="!newMessage.trim()"
                    class="absolute right-2 w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-md">
                    <i class="fas fa-paper-plane text-sm"></i>
                </button>
            </div>
        </div>
    </div>
  `
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  newMessage = '';
  showQuickReplies = true;
  messageId = 0;
  
  quickReplies = ['Our Services', 'Pricing Info', 'Talk to Human', 'Book Meeting'];

  messages: ChatMessage[] = [
    {
      id: this.messageId++,
      text: "👋 Hi there! I'm NDI's Premium Assistant. How can I help you transform your digital presence today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
        setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.chatScrollContainer) {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  sendQuickReply(reply: string) {
    this.newMessage = reply;
    this.showQuickReplies = false;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userText = this.newMessage;
    this.messages.push({
      id: this.messageId++,
      text: userText,
      sender: 'user',
      timestamp: new Date()
    });

    this.newMessage = '';
    this.isTyping = true;
    this.showQuickReplies = false;

    // Simulate network delay for premium feel
    setTimeout(() => {
      this.generateAutoReply(userText);
    }, 1500);
  }

  generateAutoReply(userText: string) {
    this.isTyping = false;
    let botResponse = "Thank you for reaching out! One of our premium experts will review your request and get back to you shortly.";

    const text = userText.toLowerCase();
    
    if (text.includes('service') || text.includes('what do you do')) {
      botResponse = "We specialize in Enterprise Software, Mobile Apps, Web Platforms, and Digital Transformation consulting. Which area interests you?";
    } else if (text.includes('price') || text.includes('cost') || text.includes('pricing')) {
      botResponse = "Our solutions are tailored to your specific enterprise needs. Would you like to schedule a quick discovery call to get a custom quote?";
    } else if (text.includes('human') || text.includes('support') || text.includes('contact')) {
      botResponse = "I'll connect you with our global support team right away. You can also reach us directly at info@noshahidevelopers.com or +1 (555) 123-4567.";
    } else if (text.includes('book') || text.includes('meeting')) {
      botResponse = "Fantastic! Our calendar is available on the Contact page. Please feel free to select a time that works best for your team.";
    }

    this.messages.push({
      id: this.messageId++,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    });

    // Bring back quick replies after 2 seconds if relevant
    setTimeout(() => {
        this.showQuickReplies = true;
    }, 2000);
  }
}
