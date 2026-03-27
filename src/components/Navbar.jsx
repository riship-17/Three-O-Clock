import StaggeredMenu from './StaggeredMenu';

export default function Navbar() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/#about' },
    { label: 'Menu', ariaLabel: 'View our menu', link: '/#menu' },
    { label: 'Gallery', ariaLabel: 'View our gallery', link: '/#gallery' },
    { label: 'Events', ariaLabel: 'Upcoming events', link: '/events' },
    { label: 'Location', ariaLabel: 'Find us', link: '/#location' },
    {label:"Book Slot",ariaLabel:"Book a slot",link:"https://www.swiggy.com/restaurants/three-o-clock-raysan-koramangala-ahmedabad-1339878/dineout?is_retargeting=true&media_source=GoogleReserve&utm_campaign=GoogleMap&utm_source=GoogleReserve"}
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/threeoclock_gandhinagar/' },
   
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#eeebe2"
      openMenuButtonColor="#eeebe2"
      changeMenuColorOnOpen={true}
      logoUrl="/logo.png"
      accentColor="#8f908a"
      isFixed={true}

      
    />
  );
}
