import styled from '@emotion/styled';
import React from 'react';

export const MemberCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
    min-width: 200px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    margin: 1rem;
    box-shadow: 0 2px 8px 4px rgba(0,0,0,0.1);
    .avatar{
        width: 200px;
        height: 200px;
    }
    .name{
        font-size: 1.1rem;
        text-align: center;
        padding: 1.6rem 0.5rem;
        box-sizing: border-box;
    }
    img{
        width: 100%;
        height: auto;
        filter: grayscale(10%);
    }
`;

export function Card ({image, name}){
    return(
        <MemberCardContainer>
            <div className="avatar">
                <img src={image} />
            </div>
            <span className="name">{name}</span>
        </MemberCardContainer>
    )
};