import profileImage from '../../assets/profile.png'

export function Masthead() {
  return (
    <header className="bg-blue-600 text-white text-center py-20 w-full">
      <div className="w-full px-4 flex flex-col items-center">
        {/* Masthead Avatar Image */}
        <img
          className="w-48 h-48 rounded-full mb-8 border-4 border-blue-600"
          src={profileImage}
          alt="Bryce Hoehn, UX Designer Avatar"
          loading="eager" // Eager load for above-the-fold image
        />
        {/* Masthead Heading */}
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Bryce Hoehn</h1>
        {/* Icon Divider */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-1 bg-white"></div>
          <div className="mx-4 text-2xl"><span className="fas fa-star"></span></div>
          <div className="w-16 h-1 bg-white"></div>
        </div>
        {/* Masthead Subheading */}
        <p className="text-xl font-light mb-2">UX Developer</p>
        <p className="text-lg font-light max-w-2xl">
          Hi, I'm Bryce. I combine UX research and front-end development to craft web experiences that are both beautiful and easy to use. I specialize in React, modern JavaScript, and building interfaces that solve real user problems.
        </p>
      </div>
    </header>
  )
}
