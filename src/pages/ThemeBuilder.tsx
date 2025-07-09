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
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowRight, ArrowLeft, Palette, Type, Frame, Globe, 
  MessageCircle, Bot, Magnet, User, Loader2, CheckCircle,
  Copy, Eye, Download, Building, Target, Brush, Layout,
  Smartphone, Monitor, Tablet, Send, Coffee, Store,
  Heart, Star, Zap, Shield, Book, Camera, Music, Plane,
  Clock, Map, Mail, Phone, Cloud, Database, Settings,
  TrendingUp, Award, Lock, Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ThemeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessDescription: '',
    websiteGoal: '',
    
    // Design Preferences
    designStyle: '',
    brandingKeywords: [] as string[],
    primaryColor: '#00AEEF',
    secondaryColor: '#71BC4F',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    accentColor: '#F2F2F2',
    
    // Typography
    headingFont: 'Poppins, sans-serif',
    bodyFont: 'Nunito, sans-serif',
    fontWeightRange: '400–700',
    
    // Layout Preferences
    maxContainerWidth: '1200px',
    gridSystem: '12-column',
    headerType: 'Sticky',
    headerStyle: '',
    heroType: 'split-screen',
    footerStyle: '4-column dark footer',
    
    // Content Sections
    sectionsOrder: [] as string[],
    
    // Animation Preferences  
    animationType: 'subtle, UX-enhancing',
    animationEffects: [] as string[],
    
    // Pages
    selectedPages: [] as string[],
    
    // Features & Integrations
    selectedFeatures: [] as string[],
    integrations: [] as string[],
    plugins: [] as string[],
    
    // Technical Requirements
    responsive: true,
    seoOptimized: true,
    performanceOptimized: true,
    ecommerce: false,
    bookingSystem: false,
    userDashboard: false,
    multiLanguage: false,
    
    // Brand Elements
    logoStyle: 'Text + icon logo',
    domain: '',
    tagline: ''
  });

  const designStyles = [
    { 
      id: 'modern-minimalist', 
      name: 'Modern Minimalist', 
      description: 'Clean, spacious design with lots of white space',
      preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      icon: Zap
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Clean, trustworthy design for business applications',
      preview: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      icon: Building
    },
    { 
      id: 'creative-artistic', 
      name: 'Creative & Artistic', 
      description: 'Unique, expressive design with creative flair',
      preview: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      icon: Palette
    },
    { 
      id: 'luxury-premium', 
      name: 'Luxury Premium', 
      description: 'Elegant, high-end sophisticated design',
      preview: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      icon: Award
    },
    { 
      id: 'tech-startup', 
      name: 'Tech/Startup', 
      description: 'Modern, innovative look for tech companies',
      preview: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      icon: TrendingUp
    },
    { 
      id: 'eco-friendly', 
      name: 'Eco-Friendly', 
      description: 'Nature-inspired with sustainable aesthetics',
      preview: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
      icon: Heart
    }
  ];

  const businessTypes = [
    'Home Cleaning & Maintenance Services',
    'Smart Home Store & E-commerce',
    'Professional Services',
    'Healthcare & Medical',
    'Technology & Software',
    'E-commerce & Retail',
    'Education & Training',
    'Real Estate',
    'Food & Beverage',
    'Travel & Tourism',
    'Fashion & Beauty',
    'Fitness & Wellness',
    'Non-profit Organization',
    'Other'
  ];

  const brandingKeywords = [
    'clean', 'reliable', 'eco-friendly', 'professional', 'smart technology',
    'innovative', 'trustworthy', 'modern', 'sustainable', 'efficient',
    'premium', 'affordable', 'convenient', 'secure', 'user-friendly'
  ];

  const headerStyles = [
    {
      id: 'transparent-hero',
      name: 'Transparent over Hero',
      description: 'Logo on left, menu center, right-side icons',
      preview: 'Transparent header with centered navigation'
    },
    {
      id: 'classic-sticky',
      name: 'Classic Sticky',
      description: 'Traditional navigation bar that stays on top',
      preview: 'Standard sticky navigation header'
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      description: 'Simple, uncluttered header design',
      preview: 'Clean and minimal header layout'
    }
  ];

  const sectionOptions = [
    { id: 'hero', name: 'Hero Section', icon: Star },
    { id: 'featured-services', name: 'Featured Services Grid', icon: Settings },
    { id: 'featured-products', name: 'Featured Product Slider', icon: Store },
    { id: 'why-choose-us', name: 'Why Choose Us (3-columns)', icon: Award },
    { id: 'pricing-plans', name: 'Pricing Plans with Subscriptions', icon: Gift },
    { id: 'testimonials', name: 'Testimonials (carousel)', icon: MessageCircle },
    { id: 'blog-highlights', name: 'Blog Highlights (3 posts)', icon: Book },
    { id: 'faq', name: 'FAQ Accordion', icon: MessageCircle },
    { id: 'contact-cta', name: 'Contact CTA + Live Chat prompt', icon: Phone }
  ];

  const animationEffects = [
    'fade-in on scroll',
    'hover zoom on cards and buttons', 
    'accordion expand/collapse',
    'lazy loading for images',
    'slide-up transitions for hero & testimonials',
    'smooth scrolling',
    'parallax effects',
    'micro-interactions'
  ];

  const pageOptions = [
    { id: 'home', name: 'Home', components: ['Hero Section', 'Top Services', 'Featured Products', 'Why Choose Us', 'Subscription Plans', 'Customer Testimonials', 'Blog Grid Preview', 'Call to Action Banner'] },
    { id: 'about', name: 'About Us', components: ['Company Story', 'Our Mission', 'Team Section', 'Sustainability Commitment'] },
    { id: 'services', name: 'Services', components: ['Filterable Service Grid', 'Expandable Service Details', 'Instant Booking CTA', 'FAQ Accordion'] },
    { id: 'shop', name: 'Shop', components: ['WooCommerce Product Grid', 'Sidebar Filters (category, price, tag)', 'Quick View', 'Sticky Add-to-Cart', 'Related Products'] },
    { id: 'subscription-plans', name: 'Subscription Plans', components: ['Monthly/Quarterly/Annual Cards', 'Plan Comparison Table', 'CTA: Subscribe Now'] },
    { id: 'blog', name: 'Blog', components: ['Post Grid Layout', 'Sidebar (recent posts, categories)', 'Search Bar'] },
    { id: 'contact', name: 'Contact Us', components: ['Contact Form (WPForms)', 'Embedded Google Map', 'Support Info with Icons', 'Live Chat Access'] },
    { id: 'my-account', name: 'My Account', components: ['Order History', 'Service Bookings', 'Subscriptions', 'Account Settings', 'Address Book'] },
    { id: 'faq', name: 'FAQ', components: ['Accordion Sections', 'Searchable Topics'] }
  ];

  const integrationOptions = [
    { id: 'google-maps', name: 'Google Maps', icon: Map },
    { id: 'mailchimp', name: 'Mailchimp Newsletter', icon: Mail },
    { id: 'google-analytics', name: 'Google Analytics 4', icon: TrendingUp },
    { id: 'stripe', name: 'Stripe Payments', icon: Shield },
    { id: 'paypal', name: 'PayPal Payments', icon: Shield },
    { id: 'tawk-to', name: 'Tawk.to Live Chat', icon: MessageCircle },
    { id: 'fluent-crm', name: 'FluentCRM', icon: Database }
  ];

  const pluginOptions = [
    'WooCommerce',
    'WooCommerce Subscriptions',
    'YITH WooCommerce Wishlist',
    'Elementor Pro',
    'Bookly Pro',
    'WPForms',
    'Mailchimp for WooCommerce',
    'FluentCRM',
    'Google Site Kit',
    'Yoast SEO',
    'WP Rocket',
    'Smush',
    'Wordfence',
    'Really Simple SSL',
    'reCaptcha by BestWebSoft',
    'Tawk.to Live Chat',
    'Advanced Custom Fields (ACF)',
    'WPML'
  ];

  const steps = [
    { id: 1, title: 'Business Info', description: 'Tell us about your business' },
    { id: 2, title: 'Design Style', description: 'Choose your visual preferences' },
    { id: 3, title: 'Layout & Pages', description: 'Select layout and page structure' },
    { id: 4, title: 'Features & Tech', description: 'Choose functionality and integrations' },
    { id: 5, title: 'Review & Generate', description: 'Final review and generation' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckboxChange = (checked: boolean, item: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), item]
        : (prev[field as keyof typeof prev] as string[]).filter(i => i !== item)
    }));
  };

  const generateThemeJSON = () => {
    return {
      business_info: {
        name: formData.businessName,
        type: formData.businessType,
        description: formData.businessDescription
      },
      website_goal: formData.websiteGoal,
      design_preferences: {
        style: formData.designStyle,
        branding_keywords: formData.brandingKeywords,
        color_palette: {
          primary: formData.primaryColor,
          secondary: formData.secondaryColor,
          background: formData.backgroundColor,
          text: formData.textColor,
          accent: formData.accentColor
        },
        typography: {
          heading_font: formData.headingFont,
          body_font: formData.bodyFont,
          font_weight_range: formData.fontWeightRange,
          line_height: "1.6",
          font_size_scale: {
            h1: "48px",
            h2: "36px", 
            h3: "28px",
            body: "16px"
          }
        },
        layout: {
          max_container_width: formData.maxContainerWidth,
          grid_system: formData.gridSystem,
          header: {
            type: formData.headerType,
            style: formData.headerStyle
          },
          hero_section: {
            type: formData.heroType,
            background_type: "image",
            image_style: "clean home interior with light overlay",
            headline: "Book Cleaning or Shop Essentials",
            subheadline: "Everything you need for a clean, smart home in one place.",
            cta_buttons: [
              { label: "Book Now", link: "/services" },
              { label: "Shop Products", link: "/shop" }
            ]
          },
          sections_order: formData.sectionsOrder,
          footer: {
            style: formData.footerStyle,
            columns: ["Quick Links", "Customer Support", "Newsletter Signup", "Social Media Icons"],
            extras: ["language switcher", "payment icons", "GDPR link"]
          }
        },
        animations: {
          type: formData.animationType,
          effects: formData.animationEffects
        },
        icons_style: "Rounded line icons with soft shadows and accent color backgrounds",
        imagery: {
          style: "Blend of realistic service shots (cleaning, plumbing, etc.) and product lifestyle mockups",
          source: "Royalty-free (Unsplash, Pexels) or placeholders"
        }
      },
      pages: formData.selectedPages.map(pageId => {
        const page = pageOptions.find(p => p.id === pageId);
        return {
          name: page?.name || pageId,
          components: page?.components || []
        };
      }),
      functional_requirements: {
        responsive: formData.responsive,
        seo_optimized: formData.seoOptimized,
        performance: "Core Web Vitals compliant, lazy loading, compressed assets, optimized queries",
        builder_support: ["Elementor Pro", "Gutenberg"],
        ecommerce: formData.ecommerce ? {
          platform: "WooCommerce",
          features: [
            "Mini Cart",
            "Product Variations", 
            "WooCommerce Subscriptions",
            "Coupons",
            "Inventory Management",
            "Reviews",
            "Ajax Add-to-Cart",
            "Stripe & PayPal Checkout"
          ]
        } : null,
        booking_system: formData.bookingSystem ? {
          plugin: "Bookly Pro",
          features: [
            "Calendar Integration",
            "Time Slots",
            "SMS & Email Notifications",
            "Multi-service selection"
          ]
        } : null,
        user_dashboard: formData.userDashboard ? {
          sections: ["Orders", "Bookings", "Subscriptions", "Addresses", "Profile Settings"]
        } : null,
        features: {
          wishlist: formData.selectedFeatures.includes('wishlist'),
          sticky_header: formData.selectedFeatures.includes('sticky_header'),
          scroll_to_top: formData.selectedFeatures.includes('scroll_to_top'),
          light_dark_mode: formData.selectedFeatures.includes('light_dark_mode'),
          multi_language_ready: formData.multiLanguage,
          rtl_support: formData.selectedFeatures.includes('rtl_support'),
          predictive_search: formData.selectedFeatures.includes('predictive_search'),
          live_chat: formData.selectedFeatures.includes('live_chat'),
          quick_view_products: formData.selectedFeatures.includes('quick_view_products'),
          ajax_filters: formData.selectedFeatures.includes('ajax_filters'),
          popup_ctas: formData.selectedFeatures.includes('popup_ctas'),
          custom_post_types: ["Products", "Services", "Testimonials", "Subscriptions", "FAQs"]
        },
        security: {
          captcha: formData.selectedFeatures.includes('captcha'),
          gdpr_compliance: formData.selectedFeatures.includes('gdpr_compliance'),
          firewall_ready: formData.selectedFeatures.includes('firewall_ready'),
          ssl_ready: formData.selectedFeatures.includes('ssl_ready')
        },
        future_scalability: {
          api_ready: formData.selectedFeatures.includes('api_ready'),
          headless_mode_supported: formData.selectedFeatures.includes('headless_mode'),
          mobile_app_compatible: formData.selectedFeatures.includes('mobile_app_compatible'),
          multi_vendor_compatible: false
        }
      },
      integrations: formData.integrations.reduce((acc, integration) => {
        switch(integration) {
          case 'google-maps':
            acc.google_maps = true;
            break;
          case 'mailchimp':
            acc.newsletter = "Mailchimp";
            break;
          case 'google-analytics':
            acc.analytics = ["Google Analytics 4"];
            break;
          case 'stripe':
          case 'paypal':
            if (!acc.payment_gateways) acc.payment_gateways = [];
            acc.payment_gateways.push(integration === 'stripe' ? 'Stripe' : 'PayPal');
            break;
          case 'fluent-crm':
            acc.crm = "FluentCRM";
            break;
          case 'tawk-to':
            acc.live_chat = "Tawk.to";
            break;
        }
        return acc;
      }, {} as any),
      supported_plugins: formData.plugins,
      brand_placeholder: {
        logo: formData.logoStyle,
        domain: formData.domain,
        tagline: formData.tagline
      }
    };
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    try {
      const themeData = generateThemeJSON();
      
      // Send POST request with the theme data
      const response = await fetch('/api/generate-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(themeData)
      });

      if (response.ok) {
        toast({
          title: "🎉 Theme Generated Successfully!",
          description: "Your custom theme has been created based on your preferences.",
          duration: 5000,
        });
      } else {
        throw new Error('Failed to generate theme');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      });
      console.error('Theme generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            ShinePro Theme Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your perfect website theme with our intelligent builder. Answer a few questions and get a customized theme.
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Step {currentStep} of 5</h2>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* Steps indicators for mobile, tablet, and desktop */}
            <div className="hidden md:flex justify-between">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                    step.id < currentStep 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : step.id === currentStep 
                        ? 'border-primary text-primary bg-primary/10' 
                        : 'border-muted-foreground'
                  }`}>
                    {step.id < currentStep ? <CheckCircle size={16} /> : step.id}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground hidden lg:block">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile step indicator */}
            <div className="md:hidden flex items-center justify-center space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`w-3 h-3 rounded-full ${
                    step.id <= currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Tell Us About Your Business</h3>
                  <p className="text-muted-foreground">This information helps us create a theme that perfectly represents your brand.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-base font-medium">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="e.g., ShinePro Services"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-base font-medium">Business Type *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="domain" className="text-base font-medium">Domain Name</Label>
                      <Input
                        id="domain"
                        placeholder="e.g., shineproservices.com"
                        value={formData.domain}
                        onChange={(e) => setFormData({...formData, domain: e.target.value})}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline" className="text-base font-medium">Business Tagline</Label>
                      <Input
                        id="tagline"
                        placeholder="e.g., Your Clean. Your Way."
                        value={formData.tagline}
                        onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessDescription" className="text-base font-medium">Business Description *</Label>
                      <Textarea
                        id="businessDescription"
                        placeholder="Describe what your business does, your services, and what makes you unique..."
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                        className="min-h-[120px] text-base resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="websiteGoal" className="text-base font-medium">Website Goal *</Label>
                      <Textarea
                        id="websiteGoal"
                        placeholder="What do you want to achieve with your website? (e.g., generate leads, sell products, book appointments...)"
                        value={formData.websiteGoal}
                        onChange={(e) => setFormData({...formData, websiteGoal: e.target.value})}
                        className="min-h-[100px] text-base resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Design Style & Branding */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Design Your Visual Identity</h3>
                  <p className="text-muted-foreground">Choose colors, fonts, and design style that reflect your brand personality.</p>
                </div>

                <div className="space-y-8">
                  {/* Design Style Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Design Style *</Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {designStyles.map((style) => (
                        <Card 
                          key={style.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                            formData.designStyle === style.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:ring-1 hover:ring-primary/50'
                          }`}
                          onClick={() => setFormData({...formData, designStyle: style.id})}
                        >
                          <CardContent className="p-4">
                            <div 
                              className="w-full h-20 rounded-lg mb-3"
                              style={{ background: style.preview }}
                            />
                            <div className="flex items-center space-x-2 mb-2">
                              <style.icon className="w-5 h-5 text-primary" />
                              <h4 className="font-semibold">{style.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{style.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Color Palette</Label>
                    <div className="grid md:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            id="primaryColor"
                            value={formData.primaryColor}
                            onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                          />
                          <Input
                            value={formData.primaryColor}
                            onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            id="secondaryColor"
                            value={formData.secondaryColor}
                            onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                          />
                          <Input
                            value={formData.secondaryColor}
                            onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Background</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            id="backgroundColor"
                            value={formData.backgroundColor}
                            onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                          />
                          <Input
                            value={formData.backgroundColor}
                            onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="textColor">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            id="textColor"
                            value={formData.textColor}
                            onChange={(e) => setFormData({...formData, textColor: e.target.value})}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                          />
                          <Input
                            value={formData.textColor}
                            onChange={(e) => setFormData({...formData, textColor: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accentColor">Accent Color</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            id="accentColor"
                            value={formData.accentColor}
                            onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                          />
                          <Input
                            value={formData.accentColor}
                            onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Branding Keywords */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Branding Keywords</Label>
                    <p className="text-sm text-muted-foreground">Select keywords that best describe your brand personality:</p>
                    <div className="flex flex-wrap gap-2">
                      {brandingKeywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant={formData.brandingKeywords.includes(keyword) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            formData.brandingKeywords.includes(keyword) 
                              ? 'bg-primary hover:bg-primary/90' 
                              : 'hover:bg-primary/10'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.brandingKeywords.includes(keyword), 
                            keyword, 
                            'brandingKeywords'
                          )}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="headingFont">Heading Font</Label>
                      <Input
                        id="headingFont"
                        value={formData.headingFont}
                        onChange={(e) => setFormData({...formData, headingFont: e.target.value})}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bodyFont">Body Font</Label>
                      <Input
                        id="bodyFont"
                        value={formData.bodyFont}
                        onChange={(e) => setFormData({...formData, bodyFont: e.target.value})}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Layout & Pages */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Layout className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Design Your Layout & Structure</h3>
                  <p className="text-muted-foreground">Choose layout options, page structure, and content organization.</p>
                </div>

                <div className="space-y-8">
                  {/* Header Style */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Header Style *</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {headerStyles.map((style) => (
                        <Card 
                          key={style.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.headerStyle === style.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:ring-1 hover:ring-primary/50'
                          }`}
                          onClick={() => setFormData({...formData, headerStyle: style.id})}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{style.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{style.description}</p>
                            <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                              {style.preview}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Content Sections Order */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Homepage Sections</Label>
                    <p className="text-sm text-muted-foreground">Select and order the sections for your homepage:</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {sectionOptions.map((section) => (
                        <div 
                          key={section.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.sectionsOrder.includes(section.id)
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.sectionsOrder.includes(section.id), 
                            section.id, 
                            'sectionsOrder'
                          )}
                        >
                          <section.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium">{section.name}</span>
                          {formData.sectionsOrder.includes(section.id) && (
                            <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pages Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Website Pages</Label>
                    <p className="text-sm text-muted-foreground">Select the pages you need for your website:</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pageOptions.map((page) => (
                        <Card 
                          key={page.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                            formData.selectedPages.includes(page.id) 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:ring-1 hover:ring-primary/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.selectedPages.includes(page.id), 
                            page.id, 
                            'selectedPages'
                          )}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{page.name}</h4>
                              {formData.selectedPages.includes(page.id) && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div className="space-y-1">
                              {page.components.slice(0, 3).map((component, index) => (
                                <div key={index} className="text-xs text-muted-foreground">
                                  • {component}
                                </div>
                              ))}
                              {page.components.length > 3 && (
                                <div className="text-xs text-primary">
                                  +{page.components.length - 3} more components
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Animation Preferences */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Animation Effects</Label>
                    <p className="text-sm text-muted-foreground">Choose the animation effects you'd like on your website:</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {animationEffects.map((effect) => (
                        <div 
                          key={effect}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.animationEffects.includes(effect)
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.animationEffects.includes(effect), 
                            effect, 
                            'animationEffects'
                          )}
                        >
                          <Checkbox 
                            checked={formData.animationEffects.includes(effect)}
                          />
                          <span className="text-sm">{effect}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Features & Technical Requirements */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Features & Technical Setup</h3>
                  <p className="text-muted-foreground">Configure functionality, integrations, and technical requirements.</p>
                </div>

                <div className="space-y-8">
                  {/* Core Features */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Core Features</Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.ecommerce}
                          onCheckedChange={(checked) => setFormData({...formData, ecommerce: !!checked})}
                        />
                        <div>
                          <div className="font-medium">E-commerce Store</div>
                          <div className="text-sm text-muted-foreground">Online product sales with WooCommerce</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.bookingSystem}
                          onCheckedChange={(checked) => setFormData({...formData, bookingSystem: !!checked})}
                        />
                        <div>
                          <div className="font-medium">Booking System</div>
                          <div className="text-sm text-muted-foreground">Appointment scheduling with Bookly Pro</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.userDashboard}
                          onCheckedChange={(checked) => setFormData({...formData, userDashboard: !!checked})}
                        />
                        <div>
                          <div className="font-medium">User Dashboard</div>
                          <div className="text-sm text-muted-foreground">Customer account management area</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.multiLanguage}
                          onCheckedChange={(checked) => setFormData({...formData, multiLanguage: !!checked})}
                        />
                        <div>
                          <div className="font-medium">Multi-Language</div>
                          <div className="text-sm text-muted-foreground">WPML integration for multiple languages</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.responsive}
                          onCheckedChange={(checked) => setFormData({...formData, responsive: !!checked})}
                        />
                        <div>
                          <div className="font-medium">Mobile Responsive</div>
                          <div className="text-sm text-muted-foreground">Optimized for all devices</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-lg border">
                        <Checkbox 
                          checked={formData.seoOptimized}
                          onCheckedChange={(checked) => setFormData({...formData, seoOptimized: !!checked})}
                        />
                        <div>
                          <div className="font-medium">SEO Optimized</div>
                          <div className="text-sm text-muted-foreground">Search engine optimization included</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integrations */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Third-Party Integrations</Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {integrationOptions.map((integration) => (
                        <Card 
                          key={integration.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                            formData.integrations.includes(integration.id) 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:ring-1 hover:ring-primary/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.integrations.includes(integration.id), 
                            integration.id, 
                            'integrations'
                          )}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <integration.icon className="w-6 h-6 text-primary" />
                              <div>
                                <div className="font-medium">{integration.name}</div>
                                {formData.integrations.includes(integration.id) && (
                                  <CheckCircle className="w-4 h-4 text-primary mt-1" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Additional Features</Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        'wishlist', 'sticky_header', 'scroll_to_top', 'light_dark_mode',
                        'rtl_support', 'predictive_search', 'live_chat', 'quick_view_products',
                        'ajax_filters', 'popup_ctas', 'captcha', 'gdpr_compliance',
                        'firewall_ready', 'ssl_ready', 'api_ready', 'headless_mode',
                        'mobile_app_compatible'
                      ].map((feature) => (
                        <div 
                          key={feature}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.selectedFeatures.includes(feature)
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.selectedFeatures.includes(feature), 
                            feature, 
                            'selectedFeatures'
                          )}
                        >
                          <Checkbox 
                            checked={formData.selectedFeatures.includes(feature)}
                          />
                          <span className="text-sm capitalize">{feature.replace(/_/g, ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WordPress Plugins */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">WordPress Plugins</Label>
                    <p className="text-sm text-muted-foreground">Select the plugins you'd like to include:</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {pluginOptions.map((plugin) => (
                        <div 
                          key={plugin}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.plugins.includes(plugin)
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleCheckboxChange(
                            !formData.plugins.includes(plugin), 
                            plugin, 
                            'plugins'
                          )}
                        >
                          <Checkbox 
                            checked={formData.plugins.includes(plugin)}
                          />
                          <span className="text-sm">{plugin}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Generate */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Review & Generate Your Theme</h3>
                  <p className="text-muted-foreground">Review your selections and generate your custom theme.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Summary Cards */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Building className="w-5 h-5" />
                          <span>Business Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>Name:</strong> {formData.businessName || 'Not specified'}</div>
                          <div><strong>Type:</strong> {formData.businessType || 'Not specified'}</div>
                          <div><strong>Domain:</strong> {formData.domain || 'Not specified'}</div>
                          <div><strong>Tagline:</strong> {formData.tagline || 'Not specified'}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Palette className="w-5 h-5" />
                          <span>Design Style</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>Style:</strong> {formData.designStyle || 'Not selected'}</div>
                          <div><strong>Colors:</strong></div>
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 rounded border" style={{backgroundColor: formData.primaryColor}}></div>
                            <div className="w-6 h-6 rounded border" style={{backgroundColor: formData.secondaryColor}}></div>
                            <div className="w-6 h-6 rounded border" style={{backgroundColor: formData.accentColor}}></div>
                          </div>
                          <div><strong>Keywords:</strong> {formData.brandingKeywords.join(', ') || 'None selected'}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Layout className="w-5 h-5" />
                          <span>Layout & Pages</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>Header:</strong> {formData.headerStyle || 'Not selected'}</div>
                          <div><strong>Pages:</strong> {formData.selectedPages.length} selected</div>
                          <div><strong>Sections:</strong> {formData.sectionsOrder.length} selected</div>
                          <div><strong>Animations:</strong> {formData.animationEffects.length} effects</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Settings className="w-5 h-5" />
                          <span>Features & Technical</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>E-commerce:</strong> {formData.ecommerce ? 'Yes' : 'No'}</div>
                          <div><strong>Booking System:</strong> {formData.bookingSystem ? 'Yes' : 'No'}</div>
                          <div><strong>User Dashboard:</strong> {formData.userDashboard ? 'Yes' : 'No'}</div>
                          <div><strong>Multi-Language:</strong> {formData.multiLanguage ? 'Yes' : 'No'}</div>
                          <div><strong>Integrations:</strong> {formData.integrations.length} selected</div>
                          <div><strong>Plugins:</strong> {formData.plugins.length} selected</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Theme JSON Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 p-4 rounded-lg max-h-40 overflow-y-auto">
                          <pre className="text-xs">
                            {JSON.stringify(generateThemeJSON(), null, 2).substring(0, 300)}...
                          </pre>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(generateThemeJSON(), null, 2));
                            toast({
                              title: "Copied!",
                              description: "Theme JSON copied to clipboard",
                            });
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Full JSON
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center pt-8">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    onClick={handleSubmit}
                    disabled={!formData.businessName || !formData.businessType || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Theme...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Generate & Send Theme
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    This will create and submit your custom theme configuration
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 5
                </span>
              </div>

              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <div className="w-20" /> /* Spacer for alignment */
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ThemeBuilder;