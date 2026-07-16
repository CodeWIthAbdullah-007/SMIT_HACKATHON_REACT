import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const plans = [
    { name: 'Starter', price: '$29', desc: 'For small teams and offices.', features: ['Up to 50 Assets', 'Basic AI Triage', 'Email Support', '1 Location'] },
    { name: 'Pro', price: '$99', desc: 'For growing organizations.', features: ['Up to 500 Assets', 'Advanced AI Triage', 'Priority Support', 'Multiple Locations', 'Analytics Dashboard'], popular: true },
    { name: 'Enterprise', price: 'Custom', desc: 'For large facilities.', features: ['Unlimited Assets', 'Custom AI Models', 'Dedicated Manager', 'API Access', 'SSO & Security'] }
  ]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600">Choose the plan that fits your organization.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div key={plan.name} className={`card relative ${plan.popular ? 'border-brand-600 border-2 shadow-soft' : ''}`}>
              {plan.popular && (
                <span className="absolute top-0 right-6 -mt-3 bg-brand-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
              )}
              <h3 className="font-semibold text-xl text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-600" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/login" className={`btn-primary w-full justify-center ${!plan.popular ? 'btn-secondary' : ''}`}>Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}