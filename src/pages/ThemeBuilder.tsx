import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, ArrowLeft, Palette, Type, Frame, Globe, 
  MessageCircle, Bot, Magnet, User, Loader2, CheckCircle,
  Copy, Eye, Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ThemeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [themeGenerationResult, setThemeGenerationResult] = useState<{
    themeId: string;
    downloadUrl: string;
  } | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Basic Info
    websiteName: '',
    websiteType: '',
    industry: '',
    targetAudience: '',
    
    // Design Preferences
    designStyle: '',
    colorScheme: '',
    fontPairing: '',
    selectedTheme: '', // New field for theme selection
    
    // Features
    selectedFeatures: [] as string[],
    
    // Layout & Structure
    layoutStyle: '',
    headerStyle: '',
    footerStyle: '',
    animationStyle: '',
    
    // Content Sections
    contentSections: [] as string[],
    
    // Selected Modules - NEW FIELD
    selectedModules: [] as string[],
    
    // Business Details
    businessDescription: '',
    goals: '',
    brandColors: '',
    existingWebsite: '',
    budget: '',
    timeline: '',
    
    // Contact & Social
    contactInfo: '',
    socialMedia: [] as string[],
    additionalRequirements: ''
  });

  const designStyles = [
    { name: 'Modern Minimalist', description: 'Clean, spacious design with lots of white space' },
    { name: 'Bold & Vibrant', description: 'Eye-catching colors and dynamic elements' },
    { name: 'Classic Professional', description: 'Traditional, trustworthy business appearance' },
    { name: 'Creative Artistic', description: 'Unique, expressive design with creative flair' },
    { name: 'Tech/Startup', description: 'Modern, innovative look for tech companies' },
    { name: 'Luxury Premium', description: 'Elegant, high-end sophisticated design' },
    { name: 'Playful Fun', description: 'Cheerful, energetic design with personality' },
    { name: 'Dark Mode', description: 'Sleek dark theme with contrasting highlights' },
    { name: 'Gradient Modern', description: 'Contemporary design with smooth gradients' },
    { name: 'Glassmorphism', description: 'Frosted glass effect with transparency' },
    { name: 'Neumorphism', description: 'Soft, tactile 3D-like interface elements' },
    { name: 'Retro Vintage', description: 'Nostalgic design with vintage aesthetics' },
    { name: 'Brutalist', description: 'Raw, bold design with strong typography' },
    { name: 'Organic Natural', description: 'Nature-inspired with organic shapes' },
    { name: 'Geometric', description: 'Sharp angles and geometric patterns' },
    { name: 'Hand-drawn', description: 'Sketchy, personal touch illustrations' },
    { name: 'Cyberpunk', description: 'Futuristic neon-lit digital aesthetic' },
    { name: 'Scandinavian', description: 'Simple, functional Nordic design' },
    { name: 'Industrial', description: 'Raw materials and urban aesthetics' },
    { name: 'Art Deco', description: 'Glamorous 1920s-inspired design' },
    { name: 'Bauhaus', description: 'Form follows function philosophy' },
    { name: 'Memphis Style', description: 'Bold colors and unconventional shapes' },
    { name: 'Y2K Revival', description: 'Early 2000s digital aesthetic' },
    { name: 'Cottagecore', description: 'Cozy, rural aesthetic with natural elements' }
  ];

  const industries = [
    'Technology & Software', 'Healthcare & Medical', 'Finance & Banking', 'E-commerce & Retail',
    'Education & Training', 'Real Estate', 'Food & Beverage', 'Travel & Tourism',
    'Fashion & Beauty', 'Fitness & Wellness', 'Legal Services', 'Consulting',
    'Manufacturing', 'Non-profit', 'Entertainment & Media', 'Automotive',
    'Construction', 'Photography', 'Art & Design', 'Marketing & Advertising',
    'Agriculture', 'Environmental', 'Sports & Recreation', 'Pet Services'
  ];

  const features = [
    // Core Features
    { name: 'Contact Forms', category: 'Core', icon: MessageCircle },
    { name: 'About Us Page', category: 'Core', icon: User },
    { name: 'Services/Products', category: 'Core', icon: Magnet },
    { name: 'Blog/News', category: 'Content', icon: MessageCircle },
    { name: 'Photo Gallery', category: 'Media', icon: Frame },
    { name: 'Video Integration', category: 'Media', icon: Frame },
    { name: 'Social Media Links', category: 'Social', icon: Globe },
    { name: 'Newsletter Signup', category: 'Marketing', icon: MessageCircle },
    
    // E-commerce
    { name: 'Online Store', category: 'E-commerce', icon: Magnet },
    { name: 'Shopping Cart', category: 'E-commerce', icon: Magnet },
    { name: 'Payment Gateway', category: 'E-commerce', icon: Magnet },
    { name: 'Product Reviews', category: 'E-commerce', icon: User },
    { name: 'Wishlist', category: 'E-commerce', icon: User },
    { name: 'Inventory Management', category: 'E-commerce', icon: Magnet },
    { name: 'Discount Coupons', category: 'E-commerce', icon: Magnet },
    { name: 'Order Tracking', category: 'E-commerce', icon: Magnet },
    
    // Interactive
    { name: 'Live Chat', category: 'Interactive', icon: MessageCircle },
    { name: 'Booking System', category: 'Interactive', icon: User },
    { name: 'Appointment Scheduler', category: 'Interactive', icon: User },
    { name: 'Event Calendar', category: 'Interactive', icon: Frame },
    { name: 'Search Functionality', category: 'Interactive', icon: Magnet },
    { name: 'User Registration', category: 'Interactive', icon: User },
    { name: 'Member Login', category: 'Interactive', icon: User },
    { name: 'Discussion Forums', category: 'Interactive', icon: MessageCircle },
    
    // Marketing & Analytics
    { name: 'SEO Optimization', category: 'Marketing', icon: Magnet },
    { name: 'Google Analytics', category: 'Analytics', icon: Globe },
    { name: 'Email Marketing', category: 'Marketing', icon: MessageCircle },
    { name: 'Social Media Integration', category: 'Social', icon: Globe },
    { name: 'Customer Reviews', category: 'Social', icon: User },
    { name: 'Testimonials', category: 'Social', icon: User },
    { name: 'FAQ Section', category: 'Content', icon: MessageCircle },
    { name: 'Multi-language', category: 'Accessibility', icon: Globe },
    
    // Advanced Features
    { name: 'Mobile App', category: 'Advanced', icon: Bot },
    { name: 'API Integration', category: 'Advanced', icon: Bot },
    { name: 'Custom Dashboard', category: 'Advanced', icon: User },
    { name: 'Advanced Security', category: 'Advanced', icon: Bot },
    { name: 'Database Integration', category: 'Advanced', icon: Bot },
    { name: 'Third-party Tools', category: 'Advanced', icon: Bot },
    { name: 'Custom Plugins', category: 'Advanced', icon: Bot },
    { name: 'White-label Solution', category: 'Advanced', icon: Bot },
    
    // Content Management
    { name: 'CMS Integration', category: 'Content', icon: Frame },
    { name: 'Content Scheduling', category: 'Content', icon: Frame },
    { name: 'Media Library', category: 'Media', icon: Frame },
    { name: 'Document Downloads', category: 'Content', icon: Frame },
    { name: 'Portfolio Showcase', category: 'Media', icon: Frame },
    { name: 'Case Studies', category: 'Content', icon: Frame },
    { name: 'Resource Library', category: 'Content', icon: Frame },
    { name: 'Knowledge Base', category: 'Content', icon: MessageCircle },
    
    // Performance & Technical
    { name: 'Speed Optimization', category: 'Performance', icon: Bot },
    { name: 'CDN Integration', category: 'Performance', icon: Bot },
    { name: 'Backup System', category: 'Technical', icon: Bot },
    { name: 'SSL Certificate', category: 'Security', icon: Bot },
    { name: 'GDPR Compliance', category: 'Legal', icon: Bot },
    { name: 'Cookie Consent', category: 'Legal', icon: Bot },
    { name: 'Privacy Policy', category: 'Legal', icon: User },
    { name: 'Terms of Service', category: 'Legal', icon: User },
    
    // Specialized
    { name: 'LMS Integration', category: 'Education', icon: User },
    { name: 'Course Management', category: 'Education', icon: Frame },
    { name: 'Student Portal', category: 'Education', icon: User },
    { name: 'Certification System', category: 'Education', icon: Frame },
    { name: 'Property Listings', category: 'Real Estate', icon: Magnet },
    { name: 'Virtual Tours', category: 'Real Estate', icon: Frame },
    { name: 'Mortgage Calculator', category: 'Finance', icon: Bot },
    { name: 'Restaurant Menu', category: 'Food Service', icon: Frame },
    { name: 'Online Ordering', category: 'Food Service', icon: Magnet },
    { name: 'Table Reservations', category: 'Food Service', icon: User },
    { name: 'Delivery Tracking', category: 'Food Service', icon: Magnet },
    { name: 'Patient Portal', category: 'Healthcare', icon: User },
    { name: 'Appointment Booking', category: 'Healthcare', icon: User },
    { name: 'Telemedicine', category: 'Healthcare', icon: Bot },
    { name: 'Fitness Tracking', category: 'Health & Fitness', icon: User },
    { name: 'Workout Plans', category: 'Health & Fitness', icon: Frame },
    { name: 'Nutrition Tracker', category: 'Health & Fitness', icon: Bot },
    { name: 'Event Management', category: 'Events', icon: Frame },
    { name: 'Ticket Sales', category: 'Events', icon: Magnet },
    { name: 'RSVP System', category: 'Events', icon: User },
    { name: 'Donation System', category: 'Non-profit', icon: Magnet },
    { name: 'Volunteer Management', category: 'Non-profit', icon: User },
    { name: 'Fundraising Tools', category: 'Non-profit', icon: Magnet },
    { name: 'Project Management', category: 'Business', icon: Frame },
    { name: 'Time Tracking', category: 'Business', icon: Bot },
    { name: 'Invoice Generation', category: 'Business', icon: Frame },
    { name: 'Client Portal', category: 'Business', icon: User },
    { name: 'Inventory Tracking', category: 'Business', icon: Magnet },
    { name: 'Vendor Management', category: 'Business', icon: User }
  ];

  const colorSchemes = [
    { name: 'Ocean Blue', colors: ['#0066CC', '#E6F3FF', '#FFFFFF'] },
    { name: 'Forest Green', colors: ['#228B22', '#F0FFF0', '#FFFFFF'] },
    { name: 'Sunset Orange', colors: ['#FF6347', '#FFF8DC', '#FFFFFF'] },
    { name: 'Royal Purple', colors: ['#663399', '#F8F0FF', '#FFFFFF'] },
    { name: 'Crimson Red', colors: ['#DC143C', '#FFF0F5', '#FFFFFF'] },
    { name: 'Golden Yellow', colors: ['#FFD700', '#FFFACD', '#FFFFFF'] },
    { name: 'Teal Aqua', colors: ['#20B2AA', '#F0FFFF', '#FFFFFF'] },
    { name: 'Charcoal Grey', colors: ['#36454F', '#F5F5F5', '#FFFFFF'] },
    { name: 'Rose Pink', colors: ['#FF69B4', '#FFF0F8', '#FFFFFF'] },
    { name: 'Sage Green', colors: ['#87A96B', '#F5F8F0', '#FFFFFF'] },
    { name: 'Navy & Gold', colors: ['#000080', '#FFD700', '#FFFFFF'] },
    { name: 'Black & White', colors: ['#000000', '#FFFFFF', '#F8F8F8'] },
    { name: 'Earth Tones', colors: ['#8B4513', '#F4E4BC', '#FFFFFF'] },
    { name: 'Monochrome Blue', colors: ['#4169E1', '#E6EEFF', '#FFFFFF'] },
    { name: 'Vintage Sepia', colors: ['#8B4513', '#FDF5E6', '#FFFFFF'] },
    { name: 'Neon Cyber', colors: ['#00FFFF', '#000000', '#1A1A1A'] },
    { name: 'Pastel Rainbow', colors: ['#FFB6C1', '#E6E6FA', '#FFFFFF'] },
    { name: 'Corporate Blue', colors: ['#003366', '#E6F2FF', '#FFFFFF'] }
  ];

  const fontPairings = [
    { name: 'Modern Sans', heading: 'Inter', body: 'Open Sans' },
    { name: 'Classic Serif', heading: 'Playfair Display', body: 'Source Serif Pro' },
    { name: 'Tech Clean', heading: 'Roboto', body: 'Lato' },
    { name: 'Creative Bold', heading: 'Montserrat', body: 'Nunito' },
    { name: 'Elegant Luxury', heading: 'Cormorant Garamond', body: 'Crimson Text' },
    { name: 'Friendly Casual', heading: 'Poppins', body: 'Work Sans' },
    { name: 'Corporate Professional', heading: 'IBM Plex Sans', body: 'IBM Plex Serif' },
    { name: 'Artistic Flair', heading: 'Dancing Script', body: 'Libre Baskerville' },
    { name: 'Bold Impact', heading: 'Oswald', body: 'PT Sans' },
    { name: 'Minimal Clean', heading: 'Space Grotesk', body: 'Space Mono' },
    { name: 'Retro Vintage', heading: 'Fredoka One', body: 'Merriweather' },
    { name: 'Academic Scholarly', heading: 'EB Garamond', body: 'Crimson Pro' },
    { name: 'Startup Dynamic', heading: 'Raleway', body: 'Nunito Sans' },
    { name: 'Health & Wellness', heading: 'Quicksand', body: 'Source Sans Pro' },
    { name: 'Fashion Chic', heading: 'Abril Fatface', body: 'Lora' },
    { name: 'Tech Startup', heading: 'JetBrains Mono', body: 'Fira Sans' }
  ];

  // New theme samples array
  const themeSamples = [
    {
      id: 'modern-corporate',
      name: 'Modern Corporate',
      description: 'Clean, professional design with sophisticated layout',
      colors: ['#2563EB', '#1E40AF', '#F8FAFC'],
      features: ['Sleek navigation', 'Hero sections', 'Clean typography'],
      preview: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
      category: 'Business'
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      description: 'Artistic showcase with dynamic layouts and bold visuals',
      colors: ['#7C3AED', '#A855F7', '#FAF5FF'],
      features: ['Gallery grids', 'Animations', 'Creative layouts'],
      preview: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      category: 'Creative'
    },
    {
      id: 'minimalist-zen',
      name: 'Minimalist Zen',
      description: 'Ultra-clean design focusing on content and whitespace',
      colors: ['#64748B', '#475569', '#F1F5F9'],
      features: ['White space', 'Typography focus', 'Simple navigation'],
      preview: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
      category: 'Minimal'
    },
    {
      id: 'e-commerce-pro',
      name: 'E-commerce Pro',
      description: 'Optimized for sales with product showcases and conversion',
      colors: ['#059669', '#10B981', '#ECFDF5'],
      features: ['Product grids', 'Shopping cart', 'Checkout flow'],
      preview: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      category: 'E-commerce'
    },
    {
      id: 'tech-startup',
      name: 'Tech Startup',
      description: 'Modern, innovative design for technology companies',
      colors: ['#0EA5E9', '#06B6D4', '#F0F9FF'],
      features: ['Feature sections', 'Pricing tables', 'Tech aesthetics'],
      preview: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
      category: 'Technology'
    },
    {
      id: 'luxury-premium',
      name: 'Luxury Premium',
      description: 'Elegant, high-end design with sophisticated elements',
      colors: ['#D97706', '#F59E0B', '#FFFBEB'],
      features: ['Premium layouts', 'Elegant typography', 'Luxury feel'],
      preview: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      category: 'Luxury'
    },
    {
      id: 'healthcare-trust',
      name: 'Healthcare Trust',
      description: 'Clean, trustworthy design for medical and health services',
      colors: ['#0D9488', '#14B8A6', '#F0FDFA'],
      features: ['Trust elements', 'Clean sections', 'Professional layout'],
      preview: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
      category: 'Healthcare'
    },
    {
      id: 'restaurant-warm',
      name: 'Restaurant Warm',
      description: 'Inviting, appetizing design for food and hospitality',
      colors: ['#DC2626', '#EF4444', '#FEF2F2'],
      features: ['Menu displays', 'Warm colors', 'Food photography'],
      preview: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
      category: 'Restaurant'
    },
    {
      id: 'education-bright',
      name: 'Education Bright',
      description: 'Friendly, accessible design for schools and learning',
      colors: ['#7C2D12', '#EA580C', '#FFF7ED'],
      features: ['Course layouts', 'Learning paths', 'Bright design'],
      preview: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)',
      category: 'Education'
    },
    {
      id: 'dark-elegance',
      name: 'Dark Elegance',
      description: 'Sophisticated dark theme with premium aesthetics',
      colors: ['#1F2937', '#374151', '#F9FAFB'],
      features: ['Dark theme', 'Neon accents', 'Modern layout'],
      preview: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
      category: 'Dark'
    }
  ];

  const layoutStyles = [
    'Single Page', 'Multi-page Traditional', 'Sidebar Navigation', 'Full-width Header',
    'Boxed Layout', 'Grid-based', 'Magazine Style', 'Portfolio Layout',
    'Landing Page', 'Dashboard Style', 'Card-based', 'Masonry Layout'
  ];

  const headerStyles = [
    'Minimal Logo Only', 'Classic Navigation Bar', 'Mega Menu', 'Sticky Header',
    'Transparent Overlay', 'Split Header', 'Centered Logo', 'Side Navigation',
    'Hamburger Menu', 'Dropdown Navigation', 'Breadcrumb Header', 'Multi-level Menu'
  ];

  const footerStyles = [
    'Minimal Links', 'Multi-column', 'Newsletter Signup', 'Social Media Focus',
    'Contact Information', 'Sitemap Style', 'Fat Footer', 'Sticky Footer',
    'Call-to-Action Footer', 'Corporate Footer', 'Creative Footer', 'Minimalist Footer'
  ];

  const animationStyles = [
    'No Animation', 'Subtle Hover Effects', 'Smooth Scrolling', 'Parallax Scrolling',
    'Fade In/Out', 'Slide Animations', 'Zoom Effects', 'Rotation Effects',
    'Loading Animations', 'Page Transitions', 'Interactive Elements', 'Advanced Animations'
  ];

  const contentSections = [
    'Hero/Banner', 'About Us', 'Services', 'Products', 'Portfolio',
    'Testimonials', 'Team', 'Contact', 'FAQ', 'Blog', 'News',
    'Events', 'Gallery', 'Pricing', 'Features', 'Process',
    'Statistics', 'Partners', 'Awards', 'Locations'
  ];

  const socialPlatforms = [
    'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube',
    'TikTok', 'Pinterest', 'Snapchat', 'WhatsApp', 'Telegram'
  ];

  // Available modules based on your image
  const availableModules = [
    { name: 'blog', displayName: 'Blog', description: 'Blog posts and articles' },
    { name: 'contact', displayName: 'Contact', description: 'Contact forms and information' },
    { name: 'cta', displayName: 'Call to Action', description: 'Call-to-action sections' },
    { name: 'events', displayName: 'Events', description: 'Event listings and calendar' },
    { name: 'faq', displayName: 'FAQ', description: 'Frequently asked questions' },
    { name: 'gallery', displayName: 'Gallery', description: 'Image and media galleries' },
    { name: 'newsletter', displayName: 'Newsletter', description: 'Newsletter signup forms' },
    { name: 'portfolio', displayName: 'Portfolio', description: 'Portfolio showcase' },
    { name: 'pricing', displayName: 'Pricing', description: 'Pricing tables and plans' },
    { name: 'services', displayName: 'Services', description: 'Services and offerings' },
    { name: 'team', displayName: 'Team', description: 'Team member profiles' },
    { name: 'testimonials', displayName: 'Testimonials', description: 'Customer testimonials' }
  ];

  // Generate Theme using your API
  const generateTheme = async () => {
    setIsGenerating(true);
    
    try {
      // Prepare data in the exact format your API expects
      const themeData = {
        basicInfo: {
          websiteName: formData.websiteName,
          websiteType: formData.websiteType,
          industry: formData.industry,
          targetAudience: formData.targetAudience,
          businessDescription: formData.businessDescription
        },
        designPreferences: {
          designStyle: formData.designStyle,
          colorScheme: formData.colorScheme,
          selectedTheme: formData.selectedTheme ? themeSamples.find(t => t.id === formData.selectedTheme)?.name : null,
          fontPairing: formData.fontPairing,
          brandColors: formData.brandColors
        },
        selectedFeatures: formData.selectedFeatures,
        layoutStructure: {
          layoutStyle: formData.layoutStyle,
          headerStyle: formData.headerStyle,
          footerStyle: formData.footerStyle,
          animationStyle: formData.animationStyle,
          contentSections: formData.contentSections
        },
        businessDetails: {
          goals: formData.goals,
          budget: formData.budget,
          timeline: formData.timeline,
          existingWebsite: formData.existingWebsite
        },
        contactAndSocial: {
          contactInfo: formData.contactInfo,
          socialMedia: formData.socialMedia,
          additionalRequirements: formData.additionalRequirements
        },
        selectedModules: formData.selectedModules // NEW: Include selected modules
      };

      console.log('Sending theme data:', JSON.stringify(themeData, null, 2));

      // Make API call to your server
      const response = await fetch('https://usmanhardware.site/api/themes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(themeData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Theme generation result:', result);

      // Updated to handle the new API response format
      setThemeGenerationResult({
        themeId: result.themeId,
        downloadUrl: result.downloadUrl
      });

      toast({
        title: "🎉 Theme Generated Successfully!",
        description: "Your custom theme has been created and is ready for download.",
        duration: 5000,
      });

    } catch (error) {
      console.error('Error generating theme:', error);
      toast({
        title: "❌ Theme Generation Failed",
        description: "Failed to generate theme. Please check if the server is running.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Download theme function
  const downloadTheme = () => {
    if (themeGenerationResult) {
      const downloadUrl = `https://usmanhardware.site${themeGenerationResult.downloadUrl}`;
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = ''; // Let the server determine the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "📥 Download Started",
        description: "Your theme download has started.",
        duration: 3000,
      });
    }
  };

  // Generate AI Analysis Function (keeping existing)
  const generateAIAnalysis = async () => {
    setIsGenerating(true);
    
    try {
      // Prepare comprehensive user data
      const userData = {
        basicInfo: {
          websiteName: formData.websiteName,
          websiteType: formData.websiteType,
          industry: formData.industry,
          targetAudience: formData.targetAudience,
          businessDescription: formData.businessDescription
        },
        designPreferences: {
          designStyle: formData.designStyle,
          colorScheme: formData.colorScheme,
          selectedTheme: formData.selectedTheme ? themeSamples.find(t => t.id === formData.selectedTheme)?.name : null,
          fontPairing: formData.fontPairing,
          brandColors: formData.brandColors
        },
        selectedFeatures: formData.selectedFeatures,
        layoutStructure: {
          layoutStyle: formData.layoutStyle,
          headerStyle: formData.headerStyle,
          footerStyle: formData.footerStyle,
          animationStyle: formData.animationStyle,
          contentSections: formData.contentSections
        },
        businessDetails: {
          goals: formData.goals,
          budget: formData.budget,
          timeline: formData.timeline,
          existingWebsite: formData.existingWebsite
        },
        contactAndSocial: {
          contactInfo: formData.contactInfo,
          socialMedia: formData.socialMedia,
          additionalRequirements: formData.additionalRequirements
        }
      };

      // Create AI prompt
      const aiPrompt = `
        Analyze this comprehensive website theme requirements and provide a detailed professional summary and recommendations:

        User Data: ${JSON.stringify(userData, null, 2)}

        Please provide:
        1. A professional executive summary of the user's requirements
        2. Design recommendations based on their preferences
        3. Technical suggestions for their chosen features
        4. Timeline and budget analysis
        5. Next steps and recommendations
        6. A complete JSON structure of their preferences organized professionally

        Format your response as a comprehensive analysis that would be suitable for presenting to a client and development team.
      `;

      // Make API call to Gemini
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDscgxHRLCy4suVBigT1g_pXMnE7tH_Ejw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: aiPrompt
                }
              ]
            }
          ]
        })
      });

      const result = await response.json();
      setAiResponse({
        rawResponse: result,
        userData: userData,
        formattedAnalysis: result.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis generated'
      });

      toast({
        title: "✨ AI Analysis Complete!",
        description: "Your theme requirements have been analyzed successfully.",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error generating AI analysis:', error);
      toast({
        title: "❌ Analysis Failed",
        description: "Failed to generate AI analysis. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "📋 Copied!",
      description: "Content copied to clipboard successfully.",
      duration: 2000,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: 'selectedFeatures' | 'contentSections' | 'socialMedia' | 'selectedModules', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Tell us about your website' },
    { number: 2, title: 'Design & Style', description: 'Choose your visual preferences' },
    { number: 3, title: 'Features & Functionality', description: 'Select the features you need' },
    { number: 4, title: 'Layout & Structure', description: 'Customize your site structure' },
    { number: 5, title: 'Final Details', description: 'Complete your theme requirements' }
  ];

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-12 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Palette className="w-4 h-4" />
            Professional Theme Builder
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Build Your Perfect Theme
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Create stunning, custom website themes in minutes with our intelligent builder. 
            No coding required—just your vision brought to life.
          </p>
        </div>
          
          {/* Enhanced Desktop Progress */}
          <div className="hidden lg:block mb-12">
            <div className="flex justify-between items-start relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 w-full h-0.5 bg-border"></div>
              <div 
                className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center relative bg-background px-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110' 
                      : currentStep === step.number - 1
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-3 max-w-32">
                    <div className={`font-medium text-sm transition-colors ${
                      currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Tablet Progress */}
          <div className="hidden md:block lg:hidden mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-center space-x-6">
                {(() => {
                  const startIndex = Math.max(0, Math.min(currentStep - 2, steps.length - 3));
                  const endIndex = Math.min(startIndex + 3, steps.length);
                  const visibleSteps = steps.slice(startIndex, endIndex);
                  
                  return visibleSteps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-300 ${
                          currentStep >= step.number 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {currentStep > step.number ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <div className="text-center max-w-20">
                          <div className={`font-medium text-xs transition-colors ${
                            currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {step.title}
                          </div>
                        </div>
                      </div>
                      {index < visibleSteps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-3 rounded transition-colors ${
                          currentStep > step.number ? 'bg-primary' : 'bg-border'
                        }`} />
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Progress */}
          <div className="md:hidden mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                }`}>
                  {currentStep}
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-foreground text-lg">{steps[currentStep - 1].title}</div>
                  <div className="text-muted-foreground text-sm">{steps[currentStep - 1].description}</div>
                </div>
              </div>
              
              {/* Enhanced Mobile Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Step {currentStep} of {steps.length}</span>
                  <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
                </div>
                <div className="flex space-x-1">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                        currentStep >= step.number ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        
        {/* Enhanced Form Content */}
        <Card className="glass-card border-0 shadow-2xl overflow-hidden">
          <CardHeader className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M0 0h100v100H0z%22 fill=%22none%22/%3E%3Cpath d=%22M0 0l100 100M100 0L0 100%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%220.5%22/%3E%3C/svg%3E')] opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="font-bold text-lg">{currentStep}</span>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{steps[currentStep - 1].title}</CardTitle>
                  <CardDescription className="text-primary-foreground/80 text-base">
                    {steps[currentStep - 1].description}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 bg-background/50">
            {/* Step 1: Enhanced Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
                    <Globe className="w-4 h-4" />
                    Tell us about your project
                  </div>
                  <p className="text-muted-foreground">
                    Let's start with the basics. This information helps us understand your vision and create the perfect theme for your needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="websiteName" className="text-base font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Website Name *
                    </Label>
                    <Input
                      id="websiteName"
                      value={formData.websiteName}
                      onChange={(e) => handleInputChange('websiteName', e.target.value)}
                      placeholder="e.g., TechCorp Solutions, Creative Studio, etc."
                      className="h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                    />
                    <p className="text-xs text-muted-foreground">This will be the main name displayed on your website</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="websiteType" className="text-base font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Website Type *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('websiteType', value)}>
                      <SelectTrigger className="h-12 text-base transition-all duration-200 hover:scale-[1.01]">
                        <SelectValue placeholder="Choose your website category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">🏢 Business/Corporate</SelectItem>
                        <SelectItem value="portfolio">🎨 Portfolio</SelectItem>
                        <SelectItem value="blog">📝 Blog/News</SelectItem>
                        <SelectItem value="ecommerce">🛒 E-commerce</SelectItem>
                        <SelectItem value="landing">🚀 Landing Page</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="industry" className="text-base font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Industry *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="h-12 text-base transition-all duration-200 hover:scale-[1.01]">
                        <SelectValue placeholder="What industry are you in?" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')} className="text-base">
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">This helps us suggest industry-specific features</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="targetAudience" className="text-base font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      Target Audience
                    </Label>
                    <Input
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="e.g., Young professionals, families, seniors"
                      className="h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                    />
                    <p className="text-xs text-muted-foreground">Who are you trying to reach with your website?</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="businessDescription" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Business Description
                  </Label>
                  <textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    placeholder="Briefly describe your business and what you do..."
                    className="w-full mt-2 p-3 border border-gray-700 rounded-md resize-none h-24 bg-gray-800 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Design & Style */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Design Style *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {designStyles.map((style) => (
                      <div
                        key={style.name}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.designStyle === style.name ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                        }`}
                        onClick={() => handleInputChange('designStyle', style.name)}
                      >
                        <h3 className="font-semibold text-sm mb-1 text-white">{style.name}</h3>
                        <p className="text-xs text-gray-400">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Color Scheme *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {colorSchemes.map((scheme) => (
                      <div
                        key={scheme.name}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.colorScheme === scheme.name ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                        }`}
                        onClick={() => handleInputChange('colorScheme', scheme.name)}
                      >
                        <div className="flex mb-2">
                          {scheme.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-sm mr-1"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <h3 className="font-semibold text-sm text-white">{scheme.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New Theme Samples Section */}
                {formData.colorScheme && (
                  <div>
                    <Label className="text-base font-semibold mb-4 block text-white">Choose Your Theme Sample *</Label>
                    <p className="text-gray-400 text-sm mb-6">Select a beautiful theme design that matches your vision</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {themeSamples.map((theme) => (
                        <div
                          key={theme.id}
                          className={`relative overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                            formData.selectedTheme === theme.id ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700'
                          }`}
                          onClick={() => handleInputChange('selectedTheme', theme.id)}
                        >
                          {/* Theme Preview */}
                          <div className="h-48 relative" style={{ background: theme.preview }}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-4 left-4">
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                {theme.category}
                              </Badge>
                            </div>
                            {/* Mock layout elements */}
                            <div className="absolute inset-4 flex flex-col justify-end">
                              <div className="space-y-2">
                                <div className="h-2 bg-white/30 rounded w-3/4" />
                                <div className="h-2 bg-white/20 rounded w-1/2" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Theme Info */}
                          <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                            <h3 className="font-semibold text-lg text-white mb-2">{theme.name}</h3>
                            <p className="text-gray-400 text-sm mb-3">{theme.description}</p>
                            
                            {/* Theme Features */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {theme.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Color Preview */}
                            <div className="flex gap-1">
                              {theme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border border-gray-600"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Selection Indicator */}
                          {formData.selectedTheme === theme.id && (
                            <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Font Pairing *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fontPairings.map((pairing) => (
                      <div
                        key={pairing.name}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.fontPairing === pairing.name ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                        }`}
                        onClick={() => handleInputChange('fontPairing', pairing.name)}
                      >
                        <h3 className="font-semibold text-sm mb-2 text-white">{pairing.name}</h3>
                        <div className="text-xs text-gray-400">
                          <div>Heading: {pairing.heading}</div>
                          <div>Body: {pairing.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Enhanced Features & Functionality */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
                    <Magnet className="w-4 h-4" />
                    Features & Functionality
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Select the features you need for your website</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Choose from our comprehensive collection of features. Select only what you need—you can always add more later.
                  </p>
                </div>

                <Tabs defaultValue="Core" className="w-full">
                  {/* Beautiful Tab Navigation - No Scroll */}
                  <div className="mb-8">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 bg-transparent p-1 h-auto">
                      {Object.keys(groupedFeatures).slice(0, 8).map((category) => (
                        <TabsTrigger 
                          key={category} 
                          value={category} 
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                                   bg-muted/50 hover:bg-muted text-muted-foreground
                                   rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200
                                   hover:scale-105 data-[state=active]:scale-105 data-[state=active]:shadow-lg"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  {/* Feature Cards */}
                  {Object.entries(groupedFeatures).slice(0, 8).map(([category, features]) => (
                    <TabsContent key={category} value={category} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {features.map((feature) => (
                          <div 
                            key={feature.name} 
                            className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
                              hover:shadow-lg hover:scale-[1.02] ${
                              formData.selectedFeatures.includes(feature.name)
                                ? 'border-primary bg-primary/5 shadow-md' 
                                : 'border-border bg-card hover:border-primary/50'
                            }`}
                            onClick={() => handleCheckboxChange('selectedFeatures', feature.name)}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                id={feature.name}
                                checked={formData.selectedFeatures.includes(feature.name)}
                                className="mt-1"
                                onCheckedChange={() => {}}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <feature.icon size={18} className={`${
                                    formData.selectedFeatures.includes(feature.name) 
                                      ? 'text-primary' 
                                      : 'text-muted-foreground group-hover:text-primary'
                                  } transition-colors`} />
                                  <h4 className="font-medium leading-tight">{feature.name}</h4>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {feature.category}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Selection indicator */}
                            {formData.selectedFeatures.includes(feature.name) && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Additional Categories - Redesigned */}
                {Object.keys(groupedFeatures).length > 8 && (
                  <div className="mt-12 p-6 bg-muted/20 rounded-xl border">
                    <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      Specialized Features
                    </h4>
                    <Tabs defaultValue={Object.keys(groupedFeatures)[8]} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-transparent p-1 h-auto mb-6">
                        {Object.keys(groupedFeatures).slice(8).map((category) => (
                          <TabsTrigger 
                            key={category} 
                            value={category}
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground 
                                     bg-background hover:bg-muted text-muted-foreground
                                     rounded-lg py-2 px-3 text-sm font-medium transition-all duration-200
                                     hover:scale-105 data-[state=active]:scale-105"
                          >
                            {category}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {Object.entries(groupedFeatures).slice(8).map(([category, features]) => (
                        <TabsContent key={category} value={category}>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {features.map((feature) => (
                              <div 
                                key={feature.name} 
                                className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
                                  hover:shadow-lg hover:scale-[1.02] ${
                                  formData.selectedFeatures.includes(feature.name)
                                    ? 'border-secondary bg-secondary/5 shadow-md' 
                                    : 'border-border bg-card hover:border-secondary/50'
                                }`}
                                onClick={() => handleCheckboxChange('selectedFeatures', feature.name)}
                              >
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id={feature.name}
                                    checked={formData.selectedFeatures.includes(feature.name)}
                                    className="mt-1"
                                    onCheckedChange={() => {}}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <feature.icon size={18} className={`${
                                        formData.selectedFeatures.includes(feature.name) 
                                          ? 'text-secondary' 
                                          : 'text-muted-foreground group-hover:text-secondary'
                                      } transition-colors`} />
                                      <h4 className="font-medium leading-tight">{feature.name}</h4>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {feature.category}
                                    </Badge>
                                  </div>
                                </div>
                                
                                {formData.selectedFeatures.includes(feature.name) && (
                                  <div className="absolute top-2 right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-secondary-foreground" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}

                {/* Enhanced Selected Features Summary */}
                <div className="glass-card p-6 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      Selected Features
                      <Badge variant="secondary" className="ml-2">
                        {formData.selectedFeatures.length}
                      </Badge>
                    </h4>
                    {formData.selectedFeatures.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, selectedFeatures: [] }))}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                  
                  {formData.selectedFeatures.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedFeatures.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="default" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 cursor-pointer transition-colors"
                          onClick={() => handleCheckboxChange('selectedFeatures', feature)}
                        >
                          {feature}
                          <button className="ml-2 hover:text-primary-foreground/70">×</button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Magnet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No features selected yet</p>
                      <p className="text-sm">Start by selecting features from the categories above</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Layout & Structure + Module Selection */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Layout Style *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {layoutStyles.map((style) => (
                      <div
                        key={style}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md text-center ${
                          formData.layoutStyle === style ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                        }`}
                        onClick={() => handleInputChange('layoutStyle', style)}
                      >
                        <span className="text-sm font-medium text-white">{style}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block text-white">Header Style</Label>
                    <div className="space-y-2">
                      {headerStyles.map((style) => (
                        <div
                          key={style}
                          className={`p-2 border rounded cursor-pointer text-sm transition-all hover:shadow-sm ${
                            formData.headerStyle === style ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                          }`}
                          onClick={() => handleInputChange('headerStyle', style)}
                        >
                          <span className="text-white">{style}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-4 block text-white">Footer Style</Label>
                    <div className="space-y-2">
                      {footerStyles.map((style) => (
                        <div
                          key={style}
                          className={`p-2 border rounded cursor-pointer text-sm transition-all hover:shadow-sm ${
                            formData.footerStyle === style ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                          }`}
                          onClick={() => handleInputChange('footerStyle', style)}
                        >
                          <span className="text-white">{style}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-4 block text-white">Animation Style</Label>
                    <div className="space-y-2">
                      {animationStyles.map((style) => (
                        <div
                          key={style}
                          className={`p-2 border rounded cursor-pointer text-sm transition-all hover:shadow-sm ${
                            formData.animationStyle === style ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'
                          }`}
                          onClick={() => handleInputChange('animationStyle', style)}
                        >
                          <span className="text-white">{style}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Content Sections</Label>
                  <p className="text-gray-400 text-sm mb-4">Select the sections you want to include on your website</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {contentSections.map((section) => (
                      <div key={section} className="flex items-center space-x-2 p-2 border border-gray-700 rounded hover:bg-gray-800/50 bg-gray-900/50">
                        <Checkbox
                          id={section}
                          checked={formData.contentSections.includes(section)}
                          onCheckedChange={() => handleCheckboxChange('contentSections', section)}
                        />
                        <Label htmlFor={section} className="text-sm cursor-pointer text-white">
                          {section}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NEW: Module Selection */}
                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Select Modules *</Label>
                  <p className="text-gray-400 text-sm mb-4">Choose the specific modules you want to include in your theme</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableModules.map((module) => (
                      <div
                        key={module.name}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.selectedModules.includes(module.name) 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-gray-700 bg-gray-800/50'
                        }`}
                        onClick={() => handleCheckboxChange('selectedModules', module.name)}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={module.name}
                            checked={formData.selectedModules.includes(module.name)}
                            onCheckedChange={() => handleCheckboxChange('selectedModules', module.name)}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm text-white">{module.displayName}</h3>
                            <p className="text-xs text-gray-400 mt-1">{module.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected Modules Summary */}
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Selected Modules</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedModules.map((module) => (
                        <Badge key={module} variant="secondary" className="bg-blue-500/20 text-blue-300">
                          {availableModules.find(m => m.name === module)?.displayName || module}
                        </Badge>
                      ))}
                      {formData.selectedModules.length === 0 && (
                        <p className="text-gray-400 text-sm">No modules selected yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final Details with Theme Generation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="goals" className="text-base font-semibold text-white">Website Goals</Label>
                    <textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="What do you want to achieve with your website?"
                      className="w-full mt-2 p-3 border border-gray-700 rounded-md resize-none h-20 bg-gray-800 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brandColors" className="text-base font-semibold text-white">Brand Colors (if any)</Label>
                    <Input
                      id="brandColors"
                      value={formData.brandColors}
                      onChange={(e) => handleInputChange('brandColors', e.target.value)}
                      placeholder="e.g., #FF5733, Blue, Corporate colors"
                      className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget" className="text-base font-semibold text-white">Budget Range</Label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="under-1000">Under $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="over-25000">Over $25,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-base font-semibold text-white">Timeline</Label>
                    <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">Within 3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block text-white">Social Media Platforms</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {socialPlatforms.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2 p-2 border border-gray-700 rounded hover:bg-gray-800/50 bg-gray-900/50">
                        <Checkbox
                          id={platform}
                          checked={formData.socialMedia.includes(platform)}
                          onCheckedChange={() => handleCheckboxChange('socialMedia', platform)}
                        />
                        <Label htmlFor={platform} className="text-sm cursor-pointer text-white">
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="existingWebsite" className="text-base font-semibold text-white">Existing Website (if any)</Label>
                    <Input
                      id="existingWebsite"
                      value={formData.existingWebsite}
                      onChange={(e) => handleInputChange('existingWebsite', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactInfo" className="text-base font-semibold text-white">Contact Information</Label>
                    <Input
                      id="contactInfo"
                      value={formData.contactInfo}
                      onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                      placeholder="Email, phone, or preferred contact method"
                      className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalRequirements" className="text-base font-semibold text-white">Additional Requirements</Label>
                  <textarea
                    id="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                    placeholder="Any specific requirements, features, or preferences not covered above..."
                    className="w-full mt-2 p-3 border border-gray-700 rounded-md resize-none h-24 bg-gray-800 text-white placeholder:text-gray-400"
                  />
                </div>

                {/* Theme Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Theme Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-white">Website:</span> <span className="text-gray-400">{formData.websiteName || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Type:</span> <span className="text-gray-400">{formData.websiteType || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Industry:</span> <span className="text-gray-400">{formData.industry || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Design Style:</span> <span className="text-gray-400">{formData.designStyle || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Color Scheme:</span> <span className="text-gray-400">{formData.colorScheme || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Selected Theme:</span> <span className="text-gray-400">{formData.selectedTheme ? themeSamples.find(t => t.id === formData.selectedTheme)?.name : 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Font Pairing:</span> <span className="text-gray-400">{formData.fontPairing || 'Not specified'}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-white">Features:</span> <span className="text-gray-400">{formData.selectedFeatures.length} selected</span>
                    </div>
                  </div>
                </div>

                {/* Theme Generation Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Generate Your Custom Theme
                    </h3>
                    <Button
                      onClick={generateTheme}
                      disabled={isGenerating || !formData.websiteName}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4 mr-2" />
                          Generate Theme
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {!themeGenerationResult && !isGenerating && (
                    <p className="text-gray-400 text-sm">
                      Click "Generate Theme" to create your custom website theme. 
                      The theme will be generated based on all your specifications and will be available for download.
                    </p>
                  )}

                  {themeGenerationResult && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Theme Generated Successfully!</span>
                      </div>

                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-white">Theme ID:</span>
                            <span className="text-gray-400 ml-2">{themeGenerationResult.themeId}</span>
                          </div>
                          <div>
                            <span className="font-medium text-white">Status:</span>
                            <span className="text-green-400 ml-2">Ready for Download</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-3">
                          <Button
                            onClick={downloadTheme}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Theme
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => copyToClipboard(`Theme ID: ${themeGenerationResult.themeId}\nDownload URL: https://usmanhardware.site${themeGenerationResult.downloadUrl}`)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Analysis Section (keeping existing) */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      AI Analysis & Recommendations
                    </h3>
                    <Button
                      onClick={generateAIAnalysis}
                      disabled={isGenerating}
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4 mr-2" />
                          Generate AI Analysis
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {!aiResponse && !isGenerating && (
                    <p className="text-gray-400 text-sm">
                      Generate an AI analysis of your theme requirements for professional recommendations and insights.
                    </p>
                  )}

                  {aiResponse && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Analysis Complete!</span>
                      </div>

                      {/* Formatted AI Analysis */}
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Professional Analysis & Recommendations
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(aiResponse.formattedAnalysis)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-700 overflow-x-auto">
                            {aiResponse.formattedAnalysis}
                          </pre>
                        </div>
                      </div>

                      {/* Toggle for Raw JSON */}
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setShowRawJson(!showRawJson)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {showRawJson ? 'Hide' : 'Show'} Raw Response Data
                        </Button>
                        {showRawJson && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(JSON.stringify(aiResponse, null, 2))}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy JSON
                          </Button>
                        )}
                      </div>

                      {/* Raw JSON Response */}
                      {showRawJson && (
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                          <h4 className="font-semibold text-white mb-3">Complete Response Data (JSON)</h4>
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">User Form Data:</h5>
                              <pre className="text-xs text-gray-400 bg-gray-800/50 p-3 rounded border border-gray-700 overflow-x-auto">
                                {JSON.stringify(aiResponse.userData, null, 2)}
                              </pre>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">AI Raw Response:</h5>
                              <pre className="text-xs text-gray-400 bg-gray-800/50 p-3 rounded border border-gray-700 overflow-x-auto">
                                {JSON.stringify(aiResponse.rawResponse, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center space-x-2 border-gray-600 text-white hover:bg-gray-800"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </Button>
              
              {currentStep < 5 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => {
                    if (!themeGenerationResult) {
                      generateTheme();
                    } else {
                      toast({
                        title: "🎉 Theme Ready!",
                        description: "Your theme has been generated. Use the download button above to get your files.",
                        duration: 5000,
                      });
                    }
                  }}
                  disabled={!formData.websiteName || isGenerating}
                >
                  {!themeGenerationResult ? (
                    <>
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          <span>Generating Theme...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Theme</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Theme Generated!</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeBuilder;
