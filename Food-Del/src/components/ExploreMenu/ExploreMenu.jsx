import './ExploreMenu.css';

import React, { useContext } from 'react';

import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  const handleMenuClick = (menu_name) => {
    setCategory((prev) => (prev === menu_name ? 'All' : menu_name)); // Toggle category
  };

  const handleBlogLink = (blog_link) => {
    if (blog_link) {
      window.open(blog_link, '_blank'); // Opens the link in a new tab/window
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Blogs</h1>
      <p className='explore-menu-text'>
        Discover blogs on meal planning, nutrition, and wellness. Get inspired with tips, tricks, and recipes that make healthy eating enjoyable. Explore our latest articles to elevate your meal planning, one helpful tip at a time.
      </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            className='explore-menu-list-item'
            onClick={() => handleMenuClick(item.menu_name)}
          >
            <img
              src={item.menu_image}
              className={category === item.menu_name ? 'active' : ''}
              alt=''
            />
            {/* Clicking the text opens the external blog link in a new tab/window */}
            <p onClick={() => handleBlogLink(item.blog_link)}>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
