import StaggeredMenu from './StaggeredMenu';

export default function Navbar() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/#about' },
    { label: 'Menu', ariaLabel: 'View our menu', link: '/#menu' },
    { label: 'Gallery', ariaLabel: 'View our gallery', link: '/#gallery' },
    { label: 'Events', ariaLabel: 'Upcoming events', link: '/events' },
    { label: 'Location', ariaLabel: 'Find us', link: '/#location' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/threeoclock_gandhinagar/' },
    { label: 'Facebook', link: '#' },
    { label: 'Twitter', link: '#' }
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
